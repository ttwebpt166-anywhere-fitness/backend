const environment = process.env.NODE_ENV
  ? process.env.NODE_ENV.replace(" ", "")
  : "development";
const knex = require("knex");
const knexConfig = require("../../knexfile");
module.exports = knex(knexConfig[environment]);
