const forwardDeclares = new Set(require("../../forwardDeclare.json"));
const fs = require("fs");
const recast = require("recast");
import { removeStrict } from "./no_strict";
import { descope } from "./descope";
export const reservedWords = [
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "for",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
];

const forceDescope = [
  'labs/net/webchannel/netutils.js',
  'labs/net/webchannel/requeststats.js',
  'labs/net/xhr.js',
]

export function transformClosureModule(prog, j, filename, provides, requires) {
  if (forceDescope.some(f => filename.endsWith(f))) {
    descope(prog, j);
  }
  if (!(provides && requires)) {
    [provides, requires] = processProvides(prog, j, filename);
  }
  const debug = makeModuleID(filename) === 'goog.module.ModuleInfo';
  if (debug) {
    console.log(filename);
    console.log(provides);
  }
  if (provides.length == 0) {
    console.log('no provides', filename);
    return;
  }
  const stmt = j.template.statement;
  removeStrict(prog, j);
  const [ids, refs, comments] = walk(prog, j, provides);
  const replacements = new Map();
  for (const [name, refData] of refs.entries()) {
    if (refData.declaration.length + refData.assignment.length == 0) {
      if (refData.expression.length != 0) {
        if (refData.expression.length == 1) {
          // handle goog.scope, e.g. closure/goog/labs/net/xhr.js
          if (descope(prog, j)) {
            return transformClosureModule(
              prog,
              j,
              filename,
              provides,
              requires
            );
          }
        }
        throw new Error(
          `${filename}: reference to ${name} with no decl or assign`
        );
      }
      doNamespace(name, refData);
    } else {
      doExport(name, refData);
    }
  }
  updateComments(j, comments, replacements, requires);

  function doExport(name, refData, toplevel = true) {
    if (refData.declaration.length > 1) {
      console.log(refData.declaration.map((p) => p.value.loc?.start?.line));
      throw new Error(`${filename}: multiple decls for ${name}`);
    }
    const basename = name.substring(name.lastIndexOf(".") + 1);
    let newname = basename;
    let decl = refData.declaration[0];
    let init;
    if (decl) {
      if (decl.parentPath.node.type === "AssignmentExpression") {
        decl = decl.parentPath;
        init = decl.node.right;
      }
    }

    // Generate export and declare if necessary
    if (init?.id) {
      newname = decl.node.right.id.name;
    } else if (ids.has(newname)) {
      newname = makeUnique(newname, ids);
    }
    if (decl) {
      let declStmt = j.variableDeclaration("var", [
        j.variableDeclarator(j.identifier(newname), init ?? null),
      ]);
      if (init?.type == "ClassExpression") {
        declStmt = j.classDeclaration(
          j.identifier(newname),
          init.body,
          init.superClass
        );
      } else if (init?.type == "FunctionExpression") {
        declStmt = j.functionDeclaration(
          j.identifier(newname),
          init.params,
          init.body
        );
      }
      const isPrivate = decl.parentPath.node.comments?.some(
        (c) => c.value.indexOf("@private") >= 0
      );
      if (basename === newname) {
        const replacement = isPrivate
          ? declStmt
          : j.exportNamedDeclaration(declStmt, []);
        replacement.comments = decl.parentPath.node.comments;
        replacement.loc = decl.parentPath.node.loc;
        decl.parentPath.replace(replacement);
      } else {
        declStmt.comments = decl.parentPath.node.comments;
        declStmt.loc = decl.parentPath.node.loc;
        const replacements = [declStmt];
        if (!isPrivate) {
          replacements.push(
          j.exportNamedDeclaration(null, [
            j.exportSpecifier.from({
              local: j.identifier(newname),
              exported: j.identifier(basename),
            }),
          ]));
        }
        decl.parentPath.replace(...replacements);
      }
    } else {
      if (newname === basename) {
        prog.get("body").push(stmt`export var ${basename};\n`);
      } else {
        prog.get("body").push(
          stmt`var ${newname};\n`,
          j.exportNamedDeclaration(null, [
            j.exportSpecifier.from({
              local: j.identifier(newname),
              exported: j.identifier(basename),
            }),
          ])
        );
      }
    }
    const newId = j.identifier(newname);
    const filteredRequires = requires.filter((r) => r.startsWith(name + "."));
    const requiredParts = filteredRequires.map((r) =>
      r.substring(name.length + 1).split(".")
    );
    if (toplevel || basename !== newname) {
      replacements.set(name, newname);
    }
    // Update other references
    for (const [id, refs] of Object.entries(refData)) {
      if (id == "declaration") continue;
      for (const ref of refs) {
        if (requiredParts.some((parts) => isRequire(ref, parts))) {
          continue;
        }
        ref.replace(newId);
      }
    }
  }
  function doNamespace(name, refData) {
    fs.appendFileSync("namespaces.txt", name + "\n", "utf8");
    replacements.set(name + ".", "");
    const regrouped = new Map();
    for (const ref of refData.traversal) {
      const refName = `${name}.${ref.parentPath.node.property.name}`;
      // TODO: do we need to check for prefix here?
      if (requires.includes(refName)) {
        continue;
      }
      if (!regrouped.has(refName)) {
        regrouped.set(refName, {
          declaration: [],
          assignment: [],
          expression: [],
        });
      }
      regrouped.get(refName)[classifyExpr(ref.parentPath)].push(ref.parentPath);
    }
    for (const [name, refData] of regrouped.entries()) {
      doExport(name, refData, false);
    }
  }
}

function makeUnique(name, ids) {
  let newname = name + "_";
  if (!ids.has(newname)) {
    ids.add(newname);
    return newname;
  }
  for (let i = 0; i < 1000; i++) {
    const newname = name + "_" + i;
    if (!ids.has(newname)) {
      ids.add(newname);
      return newname;
    }
  }
  throw new Error(`can't make unique name for ${name}`);
}

function processProvides(prog, j, filename) {
  const provides = [];
  const requires = [];
  const comments = [];
  const body = prog.get("body");
  let i = 0;
  const toPrune = [];
  for (const node of body.value) {
    if (
      j.match(node, { expression: { callee: { object: { name: "goog" } } } })
    ) {
      const methodName = node.expression.callee.property.name;
      if (methodName === "require") {
        const arg = node.expression.arguments[0];
        requires.push(arg.value);
      } else if (methodName === "provide") {
        const arg = node.expression.arguments[0];
        if (node.comments) {
          comments.push(...node.comments);
        }
        provides.push(arg.value);
        toPrune.push(i);
      }
      i++;
    } else {
      break;
    }
  }
  toPrune.reverse().forEach((i) => body.value.splice(i, 1));
  const needsModuleId = provides.some((p) => forwardDeclares.has(p));
  if (needsModuleId) {
    const modID = makeModuleID(filename);
    const callee = j.memberExpression(
      j.identifier("goog"),
      j.identifier("declareModuleId")
    );
    const argument = j.stringLiteral(modID);
    const call = j.callExpression(callee, [argument]);
    const stmt = j.expressionStatement(call);
    prog.get("body").value.unshift(stmt);
  }
  if (comments.length) {
    prog.get("body").value[0].comments = comments;
  }
  const filterProvides = [];
  provides.sort((a, b) => a.length - b.length);
  provides.forEach((p) => {
    if (!filterProvides.some((v) => p.startsWith(v + "."))) {
      filterProvides.push(p);
    }
  });
  const filterRequires = requires.filter((r) =>
    filterProvides.some((p) => r.startsWith(p + "."))
  );
  return [filterProvides, filterRequires];
}

export function makeModuleID(filename) {
  if (filename.endsWith(".js")) {
    filename = filename.slice(0, -3);
  }
  const parts = filename
    .split("/")
    .reduce((a, b) => (b === "goog" ? [b] : [...a, b]), []);
  const last = parts.length - 1;
  return parts.join(".");
}

function walk(prog, j, provides) {
  const providesSet = new Set(provides);
  const refs = new Map();
  const ids = new Set(reservedWords);
  const comments = [];
  const toPrune = [];
  const visitor = {
    visitIdentifier(path) {
      if (path.name === 'id' && path.parent.node.init?.property?.name === path.value.name) {
        const name = memberExprToName(path.parent.node.init);
        if (providesSet.has(name)) {
          toPrune.push(path.parent);
          return false;
        }
      }
      if (path.name !== "property" && path.name !== "key") {
        ids.add(path.value.name);
      }
      return false;
    },
    visitCommentBlock(path) {
      comments.push(path);
      return false;
    },
    visitComment(path) {
      comments.push(path);
      return false;
    },
    visitMemberExpression(path) {
      const name = memberExprToName(path.node);
      if (providesSet.has(name)) {
        if (path.name === 'init' && path.parent.node.id?.name === path.value.property.name) {
          return false;
        }
        if (!refs.has(name)) {
          refs.set(name, {
            assignment: [],
            expression: [],
            declaration: [],
            traversal: [],
          });
        }
        refs.get(name)[classifyExpr(path, true)].push(path);
      }
      this.traverse(path);
    },
  };
  recast.visit(prog.get("body"), visitor);
  toPrune.forEach((i) => {
    ids.delete(i.value.id.name);
    i.prune()
});
  return [ids, refs, comments];
}

function memberExprToName(expr) {
  if (!expr) {
    return "";
  }
  if (expr.name) {
    return expr.name;
  }
  return memberExprToName(expr.object) + "." + expr.property?.name;
}

const jsdocDecls =
  /@(?:constructor|enum|record|struct|dict|interface|type|typedef|const|package|public|private|protected|final|return|returns|param|define)\b/;

function classifyExpr(path, includeTraversal = false) {
  switch (path.parentPath.node.type) {
    case "AssignmentExpression":
      if (
        path.name == "left" &&
        path.parentPath.parentPath.node.type === "ExpressionStatement" &&
        path.parentPath.parentPath.node.comments?.some((c) =>
          jsdocDecls.test(c.value)
        )
      ) {
        return "declaration";
      }
      if (
        path.name == "left" &&
        path.parentPath.parentPath.node.type === "ExpressionStatement" &&
        path.parentPath.node.right.type === "ClassExpression"
      ) {
        return "declaration";
      }
      return "assignment";
    case "ExpressionStatement":
      return "declaration";
    case "MemberExpression":
      if (includeTraversal) return "traversal";
    default:
      return "expression";
  }
}

function updateComments(j, comments, replacements, requires) {
  const replacers = makeReplacers(replacements, requires);
  for (const comment of comments) {
    const newValue = replacers.reduce(
      (value, replacer) => replacer(value),
      comment.value.value
    );

    if (newValue !== comment.value.value) {
      // comment.value.value = newValue;
      const newComment = j.commentBlock(newValue);
      newComment.loc = comment.value.loc;
      comment.replace(newComment);
    }
  }
}

function makeReplacers(replacements, requires) {
  return [...replacements.entries()].map(([oldName, newname]) => {
    const matchingRequires = requires.filter((r) => r.startsWith(oldName));
    if (matchingRequires.length) {
      const negatives = matchingRequires.map((r) =>
        escape(r.substring(oldName.length))
      );
      const pattern = new RegExp(
        escape(oldName) + `(?!${negatives.join("|")})`,
        "g"
      );
      return (value) => value.replace(pattern, newname);
    } else {
      return (value) => value.replaceAll(oldName, newname);
    }
  });
}

function isRequire(path, requireParts) {
  for (const part of requireParts) {
    if (path?.name !== "object" || path.parent.property?.name !== part) {
      return false;
    }
    path = path.parent;
  }
  return true;
}

function escape(name) {
  return name.replaceAll(".", "\\.");
}

export default (fileInfo, api) => {
  debugger;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  transformClosureModule(root.find(j.Program), j, fileInfo.path);
  let result = root.toSource({quote: 'single'});
  try {
    if (/^ +export /m.test(result)) {
      const newRoot = j(fileInfo.source);
      if (descope(newRoot, j)) {
        transformClosureModule(newRoot.find(j.Program), j, fileInfo.path);
        result = newRoot.toSource({quote: 'single'});
      } else {
        console.log(result);
        throw new Error("bad export");
      }
    }
    j(result); // make sure the result is valid
  } catch (ex) {
    // console.log(result);
    throw ex;
  }
  return result;
};
