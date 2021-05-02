exports.up = function (knex) {
  knex.schema.createTable("classes", (table) => {
    table.increments("id").primary();
    table.string("name").NotNullable();
    table.string("type").NotNullable();
    table.integer("date").NotNullable();
    table.integer("duration").NotNullable();
    table.string("intensity_level").NotNullable();
    table.string("location").NotNullable();
    table.integer("max_attendees").NotNullable().defaultTo(30);
  });
};

exports.down = function (knex) {};
