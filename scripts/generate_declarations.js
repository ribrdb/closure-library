const fs = require("fs");
const child_process = require("child_process");

global.goog = {};
const roots = [];
goog.addDependency = function (path, provides, requires, flagsMap = {}) {
  const loadFlags = [];
  for (const [key, value] of Object.entries(flagsMap)) {
    loadFlags.push([key, value]);
  }
  provides.unshift(path);
  roots.push([
    path,
    [
      ["provides", provides],
      ["load_flags", loadFlags],
    ],
  ]);
};
require("../closure/goog/deps.js");
fs.writeFileSync("closure.depgraph", JSON.stringify([["roots", roots]]));

const filesToSkip = [];
const extraFiles = ["base.js", "functions/functions.js"];

// Note: this could be faster if we wrote in in java instead of restarting the jvm for each generated file.
// However it doesn't need to be run often, so this should be fine.
for (const [path] of roots) {
  if (filesToSkip.includes(path)) {
    continue;
  }
  const outfile = path.replace(".js", ".clutz.d.ts");
  const includeExtras = !extraFiles.includes(path);
  const args = [
    "--partialInput",
    "-o",
    outfile,
    "--depgraphs=closure.depgraph",
  ];
  if (includeExtras) {
    args.push(`--skipEmitRegExp=${extraFiles.join("|")}`);
  }
  args.push("--", path);
  if (includeExtras) {
    args.push(...extraFiles);
  }
  child_process.execFileSync(
    "/Users/ryan/Developer/clutz/build/install/clutz/bin/clutz",
    args,
    { stdio: "inherit" }
  );
  console.log(path);
}
