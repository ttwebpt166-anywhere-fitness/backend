exports.up = function(knex) {
    knex.schema.createTable("users", (users) => {
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
    knex.schema.createTable('classes', table => {
        table.increments();
        table.string('name').NotNullable();
        table.string('type').NotNullable();
        table.string('start_time').NotNullable();
        table.string('date').NotNullable()
        table.string('duration').NotNullable();
        table.string('intensity_level').NotNullable();
        table.string('location').NotNullable();
        table.integer('number_of_attendees').NotNullable();
        table.integer('max_attendees').NotNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExist("users")
        .dropTableIfExist('classes');
};