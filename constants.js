const env = require("dotenv").config();

const __prod__ = process.env.NODE_ENV.replace(" ", "") !== "development";
const url = __prod__
  ? process.env.HOST_URL
  : process.env.HOST_URL + ":" + (process.env.PORT || 5000) + "/v1";

module.exports = { __prod__, url };
