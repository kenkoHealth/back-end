exports.up = function (knex) {
  return knex.schema.createTable("goals", (table) => {
    table.uuid("id").primary();
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
