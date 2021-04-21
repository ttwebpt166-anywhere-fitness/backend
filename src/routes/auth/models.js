const db = require("../../data/dbConfig");
const { __prod__ } = require("../../../constants");

const createUser = async (user) => {
  return await db("users").insert({ ...user });
};

const findUser = async (id) => {
  return typeof id === "string"
    ? await db("users").where({ username: id }).first()
    : await db("users").where({ id }).first();
};

module.exports = { createUser, findUser };
