const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dataParser = require("./dataParser");

// For simplicity keep our data here
let data;

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "dist")));

app.use("/data", (req, res, next) => {
  const { startDate, endDate, country, app, platform, adNetwork } = req.body;
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

const loadData = () =>
  dataParser.getData().then(res => {
    data = res;
  });

module.exports = { app, loadData };
