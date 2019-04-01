import requestApi from "./utils";
import * as state from "./state";

const appSelect = document.querySelector(".filter-select--app");
const platformSelect = document.querySelector(".filter-select--platform");
const adNetworkSelect = document.querySelector(".filter-select--ad-network");
const filterButton = document.querySelector(".filter-button");

const tableContainer = document.querySelector(".analytics-table-container");

const keysOrdering = [
  "Date",
  "Country",
  "App",
  "Platform",
  "Ad Network",
  "Daily Users"
];

const keysMap = {
  App: "app",
  Platform: "platform",
  Country: "country",
  Date: "date",
  "Ad Network": "adNetwork",
  "Daily Users": "dailyUsers"
};

const reverseKeysMap = Object.keys(keysMap).reduce((res, key) => {
  res[keysMap[key]] = key;
  return res;
}, {});

function constructTable() {
  const headerLabels = [...keysOrdering];
  const table = document.createElement("table");
  table.classList.add("analytics-table");
  const thead = document.createElement("thead");
  headerLabels.forEach(function(label) {
    const th = document.createElement("th");
    th.textContent = label;
    thead.appendChild(th);
  });

  const tbody = document.createElement("tbody");
  state.get().dataPoints.forEach(function(dataPoint) {
    const tr = document.createElement("tr");
    keysOrdering.forEach(function(key) {
      const td = document.createElement("td");
      td.textContent = dataPoint[keysMap[key]];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  tableContainer.innerHTML = "";
  table.appendChild(thead);
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}

filterButton.addEventListener("click", function(e) {
  e.preventDefault();
  const app = appSelect.value;
  const platform = platformSelect.value;
  const adNetwork = adNetworkSelect.value;
  requestApi({ app, platform, adNetwork }).then(res => {
    state.append({ dataPoints: res.data });
  });
});

state.addListenerCallback(constructTable);
