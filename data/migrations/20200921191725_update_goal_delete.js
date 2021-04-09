exports.up = function (knex) {
  //   return knex.schema.alterTable("goals", (table) => {
  //     table.dropForeign("goal_user");
  //     table.foreign("goal_user").references("users.id").onDelete("CASCADE");
  //   });
};

exports.down = function (knex) {
  //   return knex.schema.alterTable("goals", (table) => {
  //     table.dropForeign("goal_user");
  //     table.foreign("goal_user").references("users.id").onDelete("NO ACTION");
  //   });
};
