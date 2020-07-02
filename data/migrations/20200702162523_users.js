exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    // Incrementing primary key ID
    table.increments();
    // Email is required, must be unique.
    table.string("email", 128).notNullable().unique();
    // Password field, required.
    table.string("password", 128).notNullable();
    // First name field, required.
    table.string("first_name", 128).notNullable();
    // Last name field, required.
    table.string("last_name", 128).notNullable();
    // Created_at timestamp.notNullable
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
