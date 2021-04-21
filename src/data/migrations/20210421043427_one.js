exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
    users.increments("id").primary();
    users.string("username").unique();
    users.string("password");
    users.string("city");
    users.string("state");
    users.string("zip");
    users.enum("account_type", ["student", "teacher"], {
      useNative: true,
      enumName: "account_type",
    });
    users.timestamp("created_on").defaultTo(knex.fn.now());
    users.timestamp("updated_on").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExist("users");
};
