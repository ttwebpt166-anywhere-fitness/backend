// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
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
    pool: {
      min: 2,
      max: 10,
    },
    searchPath: "knex,public",
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
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
    },
    acquireConnectionTimeout: 10000,
  },
};
