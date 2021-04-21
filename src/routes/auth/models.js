const db = require("../../data/dbConfig");

const createUser = async (user) => {
  return await db("users").insert({ ...user }, "*");
};

const findUser = async (id) => {
  return await db("users")
    .where(function () {
      this.where({ id }).orWhere("username", id);
    })
    .first();
};

module.exports = { createUser, findUser };
