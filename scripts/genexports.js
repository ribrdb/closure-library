const fs = require("fs");
// grep '^export ' closure/**/*.js closure/goog/../../third_party/**/*.js >exports.grep
let lineReader = require("readline").createInterface({
  input: fs.createReadStream("exports.grep"),
});

const exportsMap = {};

lineReader.on("line", function (line) {
  const [filename, code] = line.split(":");
  const match = code.match(
    /export (?:var|let|const|function|class|\{)?\s*([^ (;]+)(?: as (\w+))?/
  );

  if (match) {
    if (!exportsMap[filename]) {
      exportsMap[filename] = [];
    }
    exportsMap[filename].push(match[2]||match[1]);
  } else {
    console.log("no match", line);
  }
});

lineReader.on("close", function () {
  fs.writeFileSync("exports.json", JSON.stringify(exportsMap, null, 2));
});
