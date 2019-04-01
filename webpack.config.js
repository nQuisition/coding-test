const path = require("path");

const srcDir = path.join(__dirname, "src");
const outDir = path.join(__dirname, "dist");

module.exports = {
  mode: "development",
  entry: {
    app: path.join(srcDir, "app.js")
  },
  devtool: "inline-source-map",
  output: {
    path: outDir,
    filename: "[name].bundle.js"
  }
};
