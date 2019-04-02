import Chart from "chart.js";
import requestApi from "./utils";
import * as state from "./state";
import BarChart from "./charts/barChart";

const appSelect = document.querySelector(".filter-select--app");
const platformSelect = document.querySelector(".filter-select--platform");
const adNetworkSelect = document.querySelector(".filter-select--ad-network");
const filterButton = document.querySelector(".filter-button");

const tableContainer = document.querySelector(".analytics-table-container");
const chartCanvas = document.querySelector(".analytics-chart");

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

function getDateString(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

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

function constructChart() {
  const ctx = chartCanvas.getContext("2d");
  const data = state
    .get()
    .dataPoints.sort(function(a, b) {
      return a.date - b.date;
    })
    .map(function(pt) {
      return { ...pt, date: getDateString(pt.date) };
    });
  console.log(data.map(a => a.date));
  const dates = Array.from(
    data.reduce(function(set, dataPoint) {
      set.add(dataPoint.date);
      return set;
    }, new Set())
  );
  // Very inefficient but no time to fix
  const chartPoints = dates.map(function(date) {
    return data
      .filter(function(pt) {
        return pt.date === date;
      })
      .reduce(function(sum, pt) {
        sum += pt.dailyUsers;
        return sum;
      }, 0);
  });
  const chart = new Chart(ctx, {
    type: "line",

    // The data for our dataset
    data: {
      labels: dates,
      datasets: [
        {
          label: "Games Analytics",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: chartPoints
        }
      ]
    },

    // Configuration options go here
    options: {}
  });
}

filterButton.addEventListener("click", function(e) {
  e.preventDefault();
  const app = appSelect.value;
  const platform = platformSelect.value;
  const adNetwork = adNetworkSelect.value;
  requestApi({ app, platform, adNetwork }).then(res => {
    const data = res.data;
    state.append({
      dataPoints: data.map(dataPoint => ({
        ...dataPoint,
        date: new Date(dataPoint.date)
      }))
    });

    const barChart = new BarChart(
      document.querySelector(".bar-chart").getContext("2d"),
      {
        primaryAxisFieldName: "date",
        primaryAxisFieldComparator: (a, b) => a - b,
        primaryAxisFieldLabelify: getDateString,
        secondaryAxisFieldName: "dailyUsers",
        groupBy: "app",
        groupColors: {
          Carz: "#f77",
          "Blast!": "#7f7",
          "Bally Ball": "#77f",
          Screwed: "#f7f",
          "T-Rex": "#ff7"
        },
        spacing: 0.2,
        dataSets: [
          {
            data: data.map(dataPoint => ({
              ...dataPoint,
              date: new Date(dataPoint.date)
            }))
          }
        ]
      }
    );

    barChart.render();
  });
});

state.addListenerCallback(function() {
  constructTable();
  constructChart();
});

const barChart = new BarChart(
  document.querySelector(".bar-chart").getContext("2d"),
  {
    primaryAxisFieldName: "id",
    primaryAxisFieldComparator: (a, b) => a - b,
    secondaryAxisFieldName: "value",
    groupBy: "country",
    spacing: 0.4,
    dataSets: [
      {
        data: [
          {
            id: 0,
            country: "RU",
            value: 10
          },
          {
            id: 0,
            country: "UK",
            value: 40
          },
          {
            id: 1,
            country: "RU",
            value: 1
          },
          {
            id: 2,
            country: "RU",
            value: 9
          },
          {
            id: 2,
            country: "UK",
            value: 15
          },
          {
            id: 2,
            country: "US",
            value: 9
          },
          {
            id: 3,
            country: "RU",
            value: 8
          },
          {
            id: 3,
            country: "PL",
            value: 7
          },
          {
            id: 4,
            country: "UK",
            value: 6
          },
          {
            id: 5,
            country: "RU",
            value: 5
          }
        ]
      }
    ]
  }
);

barChart.render();
