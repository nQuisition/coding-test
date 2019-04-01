const dataParser = require("./dataParser");

let data;

const loadData = () =>
  dataParser.getData().then(res => {
    data = res;
  });

const validQueryKeysMap = {
  app: "App",
  platform: "Platform",
  adNetwork: "Ad Network"
};

const responseKeysMap = {
  App: "app",
  Platform: "platform",
  Country: "country",
  Date: "date",
  "Ad Network": "adNetwork",
  "Daily Users": "dailyUsers"
};

const toResponse = unprocessed =>
  Object.keys(unprocessed).reduce((res, key) => {
    res[responseKeysMap[key]] = unprocessed[key];
    return res;
  }, {});

// Use async in case we will use DB in the future
const getData = query => {
  return Promise.resolve(
    data
      .filter(dataPoint =>
        Object.keys(query).reduce((valid, key) => {
          if (!validQueryKeysMap[key] || query[key] === "All") {
            return valid;
          }
          return valid && dataPoint[validQueryKeysMap[key]] === query[key];
        }, true)
      )
      .map(toResponse)
  );
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
