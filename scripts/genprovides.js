const fs = require("fs");
let lineReader = require("readline").createInterface({
  input: fs.createReadStream("provides.txt"),
});

const provides = {};
const reverse = {};
const duplicates = {};

lineReader.on("line", function (line) {
  const [filename, code] = line.split(":");
  const match = code.match(/goog\.(?:provide|module)\(['"](.*)['"]\);/);

  if (match) {
    if (provides[match[1]]) {
      if (!Array.isArray(provides[match[1]])) {
        provides[match[1]] = [provides[match[1]]];
      }
      provides[match[1]].push(filename);
    } else {
      provides[match[1]] = filename;
    }
    const basename = match[1]
      .split(".")
      .reduce((a, b) => (a[0] === a[0].toUpperCase() ? a : b));
    duplicates[basename] ||= [];
    if (!duplicates[basename].some((v) => match[1].startsWith(v + "."))) {
      duplicates[basename].push(match[1]);
    }
    reverse[filename] ||= [];
    reverse[filename].push(match[1]);
  }
});

lineReader.on("close", function () {
  for (const [k, v] of Object.entries(duplicates)) {
    if (v.length <= 1) {
      delete duplicates[k];
    }
  }
  fs.writeFileSync("provides.json", JSON.stringify(provides, null, 2));
  fs.writeFileSync("reverse.json", JSON.stringify(reverse, null, 2));
  fs.writeFileSync("duplicates.json", JSON.stringify(duplicates, null, 2));
});
