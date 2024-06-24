import exp from "constants";

const fs = require("fs");
const path = require("path");
const { makeModuleID, reservedWords } = require("./closure_to_es6.2");

const depgraph = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../closure.depgraph"), "utf8")
);
const namespaces = new Set(
  fs.readFileSync("namespaces.txt", "utf8").split("\n")
);
const fileExports = JSON.parse(fs.readFileSync("exports.json", "utf8"));

const provideInfo = processDepgraph();

function processDepgraph() {
  const provideInfo = new Map();
  const [[, roots]] = depgraph;
  for (let l of roots) {
    let [p, [[, provides], [, flags]]] = l;
    const filename = path.join("./closure/goog/", p);
    const flagsMap = new Map(flags ?? []);
    const isGoogModule = flagsMap.get("module") == "goog";
    const exports = fileExports[filename];
    const info = {
      filename,
      provides: new Set(provides),
      module: isGoogModule,
      defaultExport: exports?.includes("default") ?? false,
      namespaces: new Set(provides.filter((p) => namespaces.has(p))),
      id: isGoogModule ? provides[1] : makeModuleID(filename),
      exports,
      flags: flagsMap,
    };
    provides.forEach((p) => provideInfo.set(p, info));
  }
  return provideInfo;
}

export function transformGoogRequires(prog, j, filename) {
  if (filename == "base.js" || filename.endsWith("/base.js")) {
    return;
  }
  updateForwardDecls();

  const [startIndex, importInfo] = removeRequires();
  const renames = [];
  addImports(startIndex, importInfo);
  updateReferences(importInfo);

  function updateForwardDecls() {
    prog
      .find(j.CallExpression, {
        callee: {
          object: { name: "goog" },
          property: (p) =>
            p.name === "requireType" || p.name === "forwardDeclare",
        },
      })
      .forEach((path) => {
        const name = path.node.arguments[0].value;
        path.node.arguments[0].value = provideInfo.get(name).id;
      });
  }

  function removeRequires() {
    const result = new Map();
    const requires = prog
      .find(j.CallExpression, {
        callee: { object: { name: "goog" }, property: { name: "require" } },
      })
      .paths();
    const mods = prog
      .find(j.CallExpression, {
        callee: {
          object: {
            object: { name: "goog" },
            property: { name: "module" },
          },
          property: { name: "get" },
        },
      })
      .paths();
    let startIndex;
    for (const expr of [...requires, ...mods]) {
      const name = expr.node.arguments[0].value;
      const file = provideInfo.get(name);
      if (!file) {
        console.log(`missing require: ${name}`);
        continue;
      }
      if (!result.has(file.id)) {
        result.set(file.id, { file, requires: new Map(), comments: [] });
      }
      let info = result.get(file.id);
      let stmt;
      if (expr.name === "init") {
        info.requires.set(name, expr.parent.node.id);
        stmt = expr.parent.parent;
      } else {
        info.requires.set(name, undefined);
        stmt = expr.parent;
      }
      if (typeof stmt.name !== "number") {
        throw new Error(
          `goog.require at ${filename}:${stmt.value.loc?.start.line}: ${stmt.name}`
        );
      }
      if (startIndex == null || stmt.name < startIndex) {
        startIndex = stmt.name;
      }
      if (stmt.value.comments) {
        info.comments.push(...stmt.value.comments);
      }
      stmt.prune();
    }
    return [startIndex, result];
  }

  function addImports(startIndex, importInfo) {
    const reserved = new Set(reservedWords);
    prog
      .find(j.Identifier)
      .filter((path) => path.name !== "property" && path.name !== "key")
      .forEach((path) => {
        const name = path.value.name;
        reserved.add(name);
      });
    let importStatements = [];

    function makeAlias(name) {
      let parts = name.split(".");
      let alias = "";
      let n = 0;
      do {
        let nextPart = parts.pop();
        if (nextPart) {
          alias =
            nextPart + alias.substring(0, 1).toUpperCase() + alias.substring(1);
        } else {
          if (n > 0) {
            alias = alias.substring(0, (alias.length = `${n - 1}`.length));
          }
          alias = `${alias}_${n++}`;
        }
      } while (reserved.has(alias));
      reserved.add(alias);
      return alias;
    }

    for (const info of importInfo.values()) {
      const assignments = [];
      let importpath = path.relative(
        path.dirname(filename),
        info.file.filename
      );
      if (!(importpath.startsWith("./") || importpath.startsWith("../"))) {
        importpath = `./${importpath}`;
      }
      let specifiers = [];

      const exports = new Set(info.file.exports);
      const namespaces = info.file.namespaces ? [...info.file.namespaces] : [];
      info.requires.forEach((id, name) => {
        if (!info.file.exports) {
          if (id.name) {
            specifiers.push(j.importNamespaceSpecifier(id));
          } else if (id) {
            const alias = makeAlias(name);
            specifiers.push(j.importNamespaceSpecifier(j.identifier(alias)));
            assignments.push(
              j.variableDeclaration("const", [
                j.variableDeclarator(id, j.identifier(alias)),
              ])
            );
          }
          return;
        }
        if (info.file.defaultExport) {
          if (id && id.name) {
            specifiers.push(j.importDefaultSpecifier(id));
          } else {
            const alias = makeAlias(name);
            specifiers.push(j.importDefaultSpecifier(j.identifier(alias)));
            renames.push([name, alias]);
            if (id) {
              assignments.push(
                j.variableDeclaration("const", [
                  j.variableDeclarator(id, j.identifier(alias)),
                ])
              );
            }
          }
        } else {
          if (id?.properties) {
            id.properties.forEach((p) => {
              if (!exports.has(p.key.name)) {
                throw new Error(
                  `export ${p.key.name} not found in ${info.file.id}`
                );
              }
              specifiers.push(j.importSpecifier(p.key, p.value));
            });
          } else {
            let match, fullmatch;
            const parts = name.split(".");
            for (let i = 0; i < parts.length; i++) {
              if (exports.has(parts[i])) {
                if (id && i < parts.length - 1) {
                  continue;
                }
                match = parts[i];
                fullmatch = parts.slice(0, i + 1).join(".");

                break;
              }
            }
            if (match) {
              if (!id) {
                const alias = makeAlias(fullmatch);
                renames.push([fullmatch, alias]);
                id = j.identifier(alias);
              }
              specifiers.push(j.importSpecifier(j.identifier(match), id));
            } else {
              if (info.file.module || namespaces.includes(name)) {
                if (!id) {
                  const alias = makeAlias(name);
                  renames.push([name, alias]);
                  id = j.identifier(alias);
                }
                specifiers.push(j.importNamespaceSpecifier(id));
              } else {
                let namespace = namespaces.find((n) =>
                  name.startsWith(n + ".")
                );
                if (namespace) {
                  const alias = makeAlias(namespace);
                  renames.push([namespace, alias]);
                  specifiers.push(
                    j.importNamespaceSpecifier(j.identifier(alias))
                  );
                  if (id) {
                    const tail = name.slice(namespace.length + 1);
                    const rhs = tail
                      .split(".")
                      .reduce(
                        (a, b) => j.memberExpression(a, j.identifier(b)),
                        j.identifier(alias)
                      );
                    assignments.push(
                      j.variableDeclaration("const", [
                        j.variableDeclarator(id, rhs),
                      ])
                    );
                  }
                }
              }
            }
          }
        }
      });
      // if (info.file.module) {
      //   if (info.requires.size !== 1) {
      //     console.log(info);
      //     throw new Error();
      //   }
      //   const id = [...info.requires.values()][0];
      //   if (!id) {
      //     let alias = makeAlias(info.file.id);
      //     renames.push([info.file.id, alias]);
      //     if (info.file.defaultExport) {
      //       specifiers.push(j.importDefaultSpecifier(j.identifier(alias)));
      //     } else {
      //       specifiers.push(j.importNamespaceSpecifier(j.identifier(alias)));
      //     }
      //   } else if (id?.name) {
      //     if (info.file.defaultExport) {
      //       specifiers.push(j.importDefaultSpecifier(id));
      //     } else {
      //       // TODO: probably this should be importNamespacedSpecifier,
      //       // but need to fix and re-run googmodule_to_es6 to have more default exports.
      //       specifiers.push(j.importSpecifier(id, id));
      //     }
      //   } else {
      //     if (info.file.defaultExport) {
      //       throw new Error(`destructuring default export ${info.file.id}`);
      //     }
      //     id?.properties.forEach((p) => {
      //       specifiers.push(j.importSpecifier(p.key, p.value));
      //     });
      //   }
      // } else {
      //   const namespaces = [...info.file.namespaces];
      //   info.requires.forEach((id, name) => {
      //     const namespace = namespaces.find(
      //       (n) => name == n || name.startsWith(n + ".")
      //     );
      //     if (!id) {
      //       const rename = renames.find(
      //         (r) => r[0] === name || name.startsWith(r[0] + ".")
      //       );
      //       if (rename) {
      //         console.log(`skipping ${name}: ${rename[0]} -> ${rename[1]}`);
      //         return;
      //       }

      //       const summary = {
      //         filename: info.file.filename,
      //         provides: [...info.file.provides],
      //       };
      //       if (namespace) {
      //         summary["namespace"] = namespace;
      //       }
      //       console.log(`${name}: ${JSON.stringify(summary, null, 2)}`);
      //       let alias;
      //       if (namespace) {
      //         alias = makeAlias(namespace);
      //       } else {
      //         alias = makeAlias(name);
      //       }
      //       renames.push([namespace ?? name, alias]);
      //       specifiers.push(j.importNamespaceSpecifier(j.identifier(alias)));
      //     } else {
      //       if (id.name) {
      //         if (namespace) {
      //           if (name == namespace) {
      //             specifiers.push(j.importNamespaceSpecifier(id));
      //           } else {
      //             throw new Error(`weird namespace import ${namespace}`);
      //           }
      //         } else {
      //           specifiers.push(j.importSpecifier(id, id));
      //         }
      //       } else {
      //         if (namespace) {
      //           throw new Error(`destructuring namespace ${namespace}`);
      //         }
      //         id.properties.forEach((p) => {
      //           specifiers.push(j.importSpecifier(p.key, p.value));
      //         });
      //       }
      //     }
      //   });
      // }

      const stmt = j.importDeclaration(specifiers, j.literal(importpath));
      stmt.comments = info.comments;
      importStatements.push(stmt, ...assignments);
    }
    const body = prog.nodes()[0].body;
    body.splice(startIndex, 0, ...importStatements);
  }

  function updateReferences() {
    renames.sort((a, b) => b[0].length - a[0].length);
    const renameMap = new Map(renames);
    const objects = prog.find(j.MemberExpression).filter((path) => {
      return renameMap.has(memberExprToName(path.node));
    });
    objects.forEach((path) => {
      const name = memberExprToName(path.node.original ?? path.node);
      const alias = renameMap.get(name);
      path.replace(j.identifier(alias));
    });
    prog.find(j.Comment, { type: "CommentBlock" }).forEach((path) => {
      let newValue = path.value.value;
      for (const [oldName, newName] of renames) {
        newValue = newValue.replaceAll(oldName, newName);
      }
      if (newValue !== path.value.value) {
        const newComment = j.commentBlock(newValue);
        newComment.loc = path.value.loc;
        path.replace(newComment);
      }
    });
  }
}

export default (fileInfo, api) => {
  debugger;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  transformGoogRequires(root.find(j.Program), j, fileInfo.path);
  return root.toSource({ quote: "single" });
};

function memberExprToName(expr) {
  if (!expr) {
    return undefined;
  }
  if (expr.name) {
    return expr.name;
  }
  return memberExprToName(expr.object) + "." + expr.property?.name;
}
