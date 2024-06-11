export function descope(prog, j) {
  function isGoog(node) {
    return node?.object && (node.object.name === "goog" || isGoog(node.object));
  }
  function makeMemberExpr(name) {
    return name
      .split(".")
      .map((name) => j.identifier(name))
      .reduce((expr, name) => j.memberExpression(expr, name));
  }
  let scopeCount = 0;
  prog
    .find(j.CallExpression, {
      callee: { object: { name: "goog" }, property: { name: "scope" } },
    })
    .forEach((scope) => {
      scopeCount++;
      const replacements = {};
      const scopestmt = scope.parentPath;
      const scopebody = scope.value.arguments[0].body.body;

      j(scope)
        .find(j.VariableDeclarator)
        .forEach((vd) => {
          if (
            vd.node.init &&
            j.match(vd.node.init, {
              callee: {
                object: {
                  object: { name: "goog" },
                  property: { name: "module" },
                },
                property: { name: "get" },
              },
            })
          ) {
            const name = vd.value.init.arguments[0].value;
            replacements[vd.value.id.name] = makeMemberExpr(name);
            vd.prune();
          } else if (isGoog(vd.node.init)) {
            replacements[vd.value.id.name] = vd.node.init;
            vd.prune();
          }
        });
      const ids = j(scope)
        .find(j.Identifier, (n) => replacements[n.name])
        .filter((path) => path.name !== "property" && path.name !== "key");
      ids.forEach((path) => path.replace(replacements[path.value.name]));
      debugger;
      scopebody.forEach((s) => scopestmt.insertBefore(s));
      scopestmt.prune();
    });
  // prog
  //   .find(j.AssignmentExpression, (n) => n.left == null)
  //   .forEach((p) => (p.value.left = j.identifier("$wtf$")));

  return scopeCount;
}

export default (fileInfo, api) => {
  debugger;
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  descope(root, j, fileInfo.path);
  return root.toSource();
};
