#!/usr/local/bin/node

const filename = process.argv[2];
const fs = require("fs");
const contents = fs.readFileSync(filename, "utf8");
for (const match of contents.matchAll(/goog\.require\(['"](.*)['"]\);/g)) {
  const assignmentPattern = new RegExp(
    `^\\s*(${match[1].replace(/\./g, "\\.")}[.a-zA-Z0-9_]+)\\s*=`
  );
  let assignment = contents.match(assignmentPattern);
  if (assignment) {
    console.log(`${filename}: ${assignment[1]} (${match[1]})`);
  }
}
