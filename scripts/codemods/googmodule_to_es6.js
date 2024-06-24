const forwardDeclares = new Set(require("../../forwardDeclare.json"));
const fs = require("fs");

export function transformGoogModule(prog, j, filename) {
  const body = prog.nodes()[0].body;

  const firstStatement = body[0];
  let moduleName;
  if (
    j.ExpressionStatement.check(firstStatement, {
      expression: {
        callee: {
          object: {
            name: "goog",
          },
          property: "module",
        },
      },
    })
  ) {
    moduleName = firstStatement.expression.arguments[0].value;
  }
  if (!moduleName) {
    return;
  }

  prog
    .find(j.ExpressionStatement, {
      expression: {
        callee: {
          object: {
            object: {
              name: "goog",
            },
            property: {
              name: "module",
            },
          },
          property: {
            name: "declareLegacyNamespace",
          },
        },
      },
    })
    .remove();
  const needsModuleId = forwardDeclares.has(moduleName);

  if (needsModuleId) {
    const callee = j.memberExpression(
      j.identifier("goog"),
      j.identifier("declareModuleId")
    );
    const argument = j.stringLiteral(moduleName);
    const call = j.callExpression(callee, [argument]);
    const stmt = j.expressionStatement(call);
    body.unshift(firstStatement);
    body[1] = stmt;
  }
  if (body.length > 1) {
    const secondStatement = body[1];
    if (firstStatement.comments) {
      if (secondStatement.comments) {
        secondStatement.comments = [
          ...firstStatement.comments,
          ...secondStatement.comments,
        ];
      } else {
        secondStatement.comments = firstStatement.comments;
      }
    }
    body.shift();
  }
  // exports = name
  prog
    .find(j.ExpressionStatement, {
      expression: {
        type: "AssignmentExpression",
        left: { name: "exports" },
        right: { type: "Identifier" },
      },
    })
    .forEach((path) => {
      let id = path.node.expression.right;
      checkToplevel(path);
      replacePreservingComments(
        path,
        j.exportNamedDeclaration(null, [
          j.exportSpecifier.from({ local: id, exported: id }),
        ])
      );
    });
  // exports = { ... }
  prog
    .find(j.ExpressionStatement, {
      expression: {
        type: "AssignmentExpression",
        left: { name: "exports" },
      },
    })
    .forEach((path) => {
      checkToplevel(path);
      replacePreservingComments(
        path,
        j.exportDefaultDeclaration(path.node.expression.right)
      );
    });

  // exports.foo = ...
  prog
    .find(j.ExpressionStatement, {
      expression: {
        type: "AssignmentExpression",
        left: { object: (x) => x.name === "exports" },
      },
    })
    .forEach((path) => {
      let id = path.node.expression.left.property;
      let value = path.node.expression.right;

      checkToplevel(path);
      if (j.Identifier.check(value)) {
        replacePreservingComments(
          path,
          j.exportNamedDeclaration(null, [
            j.exportSpecifier.from({ local: value, exported: id }),
          ])
        );
      } else {
        replacePreservingComments(
          path,
          j.exportNamedDeclaration(
            j.variableDeclaration("let", [j.variableDeclarator(id, value)]),
            []
          )
        );
      }
    });

  // exports.foo;
  prog
    .find(j.ExpressionStatement, {
      expression: {
        type: "MemberExpression",
        object: { name: "exports" },
      },
    })
    .forEach((path) => {
      let id = path.node.expression.property;
      let decl = prog
        .find(j.VariableDeclarator, { id: { name: id.name } })
        .closest(j.VariableDeclaration)
        .paths()[0];
      if (decl) {
        replacePreservingComments(
          decl,
          j.exportNamedDeclaration(decl.value, [])
        );
        path.prune();
        return;
      }

      checkToplevel(path);
      replacePreservingComments(
        path,
        j.exportNamedDeclaration(
          j.variableDeclaration("let", [j.variableDeclarator(id)]),
          []
        )
      );
    });


  prog
  .find(j.MemberExpression, {
      object: { name: "exports" },
  })
  .forEach((path) => {
    path.replace(path.node.property);
  });

  function checkToplevel(path) {
    if (path.parent.name !== "program") {
      throw new Error(
        `${filename}:${path.node.loc?.start?.line}: exports not at top level`
      );
    }
  }
}

function replacePreservingComments(old, newNode) {
  newNode.comments = old.node.comments;
  newNode.loc = old.node.loc;
  old.node.comments = [];
  old.replace(newNode);
}

export default (fileInfo, api) => {
  debugger;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  transformGoogModule(root.find(j.Program), j, fileInfo.path);
  return root.toSource({ quote: "single" });
};
