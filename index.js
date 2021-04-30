const server = require("./src/server");
const { url } = require("./constants");

console.log("Server Initializing");
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log("Server is listening on " + url);
});
