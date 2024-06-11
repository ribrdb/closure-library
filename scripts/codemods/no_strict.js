export function removeStrict(prog, j) {
  prog
    .find(j.ExpressionStatement, {
      expression: { value: "use strict" },
    })
    .forEach((cpath) => {
      if (cpath.node.comments?.length) {
        const next = cpath.parent.get(cpath.name + 1);
        next.node.comments ??= [];
        next.node.comments.unshift(...cpath.node.comments);
      }
      cpath.prune();
    });
}
