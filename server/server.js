const http = require("http");
const { app, loadData } = require("./app");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

loadData().then(() => {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
