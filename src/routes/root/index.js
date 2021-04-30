const { Router } = require("express");
const userReturn = require("../utils/userReturn");

const root = Router();

root.get("/", (req, res) => {
  res.json({ user: userReturn(req.user) });
});

module.exports = root;
