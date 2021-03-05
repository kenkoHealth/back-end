const users = require("../factories/UserFactory");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert(users.createUsers(10));
    });
};
