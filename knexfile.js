// Update with your config settings.
const dotenv = require("dotenv").config();

module.exports = {
  development: {
    client: "sqlite3",
    debug: true,
    connection: {
      filename: "./src/data/dev.sqlite3",
    },

    useNullAsDefault: true,
    migrations: { directory: "src/data/migrations" },
    pool: {
      afterCreate: (conn, done) => conn.run("PRAGMA foreign_keys = ON", done),
    },
  },

  staging: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    debug: true,
    pool: {
      min: 2,
      max: 10,
    },
    searchPath: "knex,public",
    migrations: {
      tableName: "knex_migrations",
      directory: "src/data/migrations",
    },
    acquireConnectionTimeout: 10000,
  },

  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    searchPath: "knex,public",
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: "src/data/migrations",
    },
    acquireConnectionTimeout: 10000,
  },
};
