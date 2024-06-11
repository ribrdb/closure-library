export function transformGoogModule(prog, j) {
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

      path.replace(
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
        right: { type: "ObjectExpression" },
      },
    })
    .forEach((path) => {
      const specifiers = path.node.expression.right.properties.map((op) =>
        j.exportSpecifier.from({ local: op.value, exported: op.key })
      );

      path.replace(j.exportNamedDeclaration(null, specifiers));
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

      path.replace(
        j.exportNamedDeclaration(null, [
          j.exportSpecifier.from({ local: value, exported: id }),
        ])
      );
    });
}
