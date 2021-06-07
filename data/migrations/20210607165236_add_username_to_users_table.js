exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("username").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
