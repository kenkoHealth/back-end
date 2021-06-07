exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.text("bio").nullable();
    table.string("site_url").nullable();
    table.string("facebook_url").nullable();
    table.string("twitter_url").nullable();
    table.string("instagram_url").nullable();
    table.string("tiktok_url").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
