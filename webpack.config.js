const path = require("path");

const srcDir = "./src";
const outDir = "./dist";

module.exports = {
  entry: path.join(srcDir, "index.js"),
  output: {
    path: outDir,
    filename: "[name].bundle.js"
  }
};
