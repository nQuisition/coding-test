const apiUrl = "http://localhost:3000/data";

// Using fetch here, even though it lacks in support a little; I usually use axios
// but decided to keep dependencies to a minimum
const requestApi = query =>
  fetch(apiUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  });

export default requestApi;
