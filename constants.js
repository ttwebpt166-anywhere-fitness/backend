const __prod__ = process.env.NODE_ENV !== "development";

const url = __prod__
  ? process.env.HOST_URL
  : process.env.HOST_URL + ":" + process.env.PORT + "/v1";

module.exports = { __prod__, url };
