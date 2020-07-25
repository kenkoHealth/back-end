const knex = require("knex");

const knexConfig = require("../knexfile");

const dbEnv = "test";

const database = knex(knexConfig[dbEnv]);

module.exports = database;
