import requestApi from "./utils";

const appSelect = document.querySelector(".filter-select--app");
const platformSelect = document.querySelector(".filter-select--platform");
const adNetworkSelect = document.querySelector(".filter-select--ad-network");
const filterButton = document.querySelector(".filter-button");

filterButton.addEventListener("click", function(e) {
  e.preventDefault();
  const app = appSelect.value;
  const platform = platformSelect.value;
  const adNetwork = adNetworkSelect.value;
  requestApi({ app, platform, adNetwork }).then(res => {
    console.log(res);
  });
});
