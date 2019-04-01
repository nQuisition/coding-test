const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dataSource = require("./dataSource");

const app = express();
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", (req, res) => {
  const params = {
    apps: ["All", ...dataSource.getAllApps()],
    platforms: ["All", ...dataSource.getAllPlatforms()],
    adNetworks: ["All", ...dataSource.getAllAdNetworks()]
  };
  res.render("index", params);
});

app.post("/data", (req, res, next) => {
  // const { startDate, endDate, country, app, platform, adNetwork } = req.body;
  dataSource.getData(req.body).then(data => {
    res.status(200).json({ message: "All ok!", data });
  });
});

// Handle 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const loadData = () => dataSource.loadData();

module.exports = { app, loadData };
