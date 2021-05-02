const db = require("../../data/dbConfig");
const { __prod__ } = require("../../../constants");

const getClass = async () => {
  return await db("classes")
    .join("users", "users.id", "classes.instructor_id")
    .select("classes.*", "users.username as teacher");
};

// const createClass = async(classInput) => {
//     return await db("classes").insert({...classInput });
// };

const findClass = async (id) => {
  return await db("classes as cl")
    .where("cl.id", id)
    .join("users as t", "t.id", "cl.instructor_id")
    .select("cl.*", "t.username as teacher")
    .first();
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
