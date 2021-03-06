// Update with your config settings.
// Bring in dotenv to pull from .env file
require("dotenv").config();

module.exports = {
  // Development Database environment
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: process.env.LOCAL_PASSWORD,
      database: "Kenko-BE",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  // Test Database environment
  test: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: process.env.LOCAL_PASSWORD,
      database: "Kenko-test",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  // Staging Database environment
  staging: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: process.env.LOCAL_PASSWORD,
      database: "Kenko-BE",
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  // Production database environment
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
