// Read and parse data from CSV into something nicer
const readline = require("readline");
const path = require("path");
const fs = require("fs");

const inputFile = path.join(__dirname, "..", "data", "data sample.csv");

const processValue = (keyName, value) => {
  if (keyName.toLowerCase() === "date") {
    const split = value.split("/");
    // months are 0 indexed
    return new Date(split[2], split[1] - 1, split[0]);
  }
  if (keyName.toLowerCase() === "daily users") {
    return Number(value);
  }
  return value;
};

const getData = () => {
  const rl = readline.createInterface({
    input: fs.createReadStream(inputFile)
  });
  const result = [];
  const keys = [];
  let onComplete;
  const resultPromise = new Promise(resolve => {
    onComplete = resolve;
  });

  rl.on("line", line => {
    const data = line.split(",");
    if (keys.length <= 0) {
      // First line contains keys
      keys.push(...data);
    } else {
      const dataPoint = data.reduce((obj, value, i) => {
        obj[keys[i]] = processValue(keys[i], value);
        return obj;
      }, {});
      result.push(dataPoint);
    }
  });

  rl.on("close", () => {
    onComplete(result);
  });

  return resultPromise;
};

module.exports = {
  getData
};
