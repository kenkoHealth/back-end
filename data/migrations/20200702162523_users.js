exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("users", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      // Email is required, must be unique.
      table.string("email", 128).notNullable().unique();
      // Password field, required.
      table.string("password", 128).notNullable();
      // First name field, required.
      table.string("first_name", 128).nullable();
      // Last name field, required.
      table.string("last_name", 128).nullable();
      // Created_at timestamp.notNullable
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
