const apiUrl = "http://localhost:3000/data";

// Using fetch here, even though it lacks in support a little; I usually use axios
// but decided to keep dependencies to a minimum
function requestApi(query) {
  return fetch(apiUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  }).then(function(res) {
    if (res.status !== 200) {
      // Error; handle!
      throw new Error("Error retrieving data");
    }
    return res.json();
  });
}

export default requestApi;
