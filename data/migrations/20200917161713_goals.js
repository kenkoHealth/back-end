exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable("goals", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("goal_name", 255).notNullable();
      table.string("goal_description", 255).notNullable();
      table.date("goal_date").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .uuid("goal_user")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("goals");
};
