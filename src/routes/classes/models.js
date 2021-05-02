const db = require("../../data/dbConfig");
const { __prod__ } = require("../../../constants");

const getClass = async (classes) => {
  return await db("classes");
};

// const createClass = async(classInput) => {
//     return await db("classes").insert({...classInput });
// };

const findClass = async (id) => {
  return await db("classes").where({ id }).first();
};

const addClass = async (classes) => {
  return (await db("classes").insert(classes, "*"))[0];
};

const editClass = async (edits, id) => {
  return await db("classes").where({ id }).update(edits, "*");
};

const deleteClass = async (id) => {
  return await db("classes").where({ id }).del();
};

module.exports = { getClass, findClass, addClass, editClass, deleteClass };
