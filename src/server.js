const express = require("express");
const dotenv = require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const auth = require("./routes/auth");
const root = require("./routes/root");
const validateJwt = require("./middleware/validateJwt");

const app = Express();

if (process.env.NODE_ENV !== "production") {
  app.use(logger);
}
app.use(express.json());
app.use(cors());

app.use("/v1/auth", auth);
app.use("/v1/", validateJwt, root);

module.exports = app;
