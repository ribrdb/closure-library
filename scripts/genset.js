var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream("forwardDeclare.txt"),
});

const results = new Set();

lineReader.on("line", function (line) {
  const [filename, code] = line.split(":");
  const match = code.match(/\(['"](.*)['"]\);/);

  if (match) {
    results.add(match[1]);
  }
});

lineReader.on("close", function () {
  console.log(JSON.stringify(Array.from(results), null, 2));
});
