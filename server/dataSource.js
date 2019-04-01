const dataParser = require("./dataParser");

let data;

const loadData = () =>
  dataParser.getData().then(res => {
    data = res;
  });

const getData = query => {
  return data;
};

// eslint-disable-next-line no-underscore-dangle
const _getUniqueValuesOfColumn = columnName =>
  Array.from(
    data.reduce((res, dataPoint) => {
      res.add(dataPoint[columnName]);
      return res;
    }, new Set())
  );

const getAllApps = () => _getUniqueValuesOfColumn("App");
const getAllCountries = () => _getUniqueValuesOfColumn("Country");
const getAllPlatforms = () => _getUniqueValuesOfColumn("Platform");
const getAllAdNetworks = () => _getUniqueValuesOfColumn("Ad Network");

module.exports = {
  loadData,
  getData,
  getAllApps,
  getAllPlatforms,
  getAllCountries,
  getAllAdNetworks
};
