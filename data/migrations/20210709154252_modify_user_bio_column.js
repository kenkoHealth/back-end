exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("bio").nullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
