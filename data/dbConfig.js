const knex = require("knex");

const knexConfig = require("../knexfile");

const dbEnv = process.env.DB_ENV;

const database = knex(knexConfig[dbEnv]);

module.exports = database;
