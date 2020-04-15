require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB,
    },
    migrations: {
      directory: "./API/db/migrations",
    },
    seeds: {
      directory: "./API/db/seeds",
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./API/db/db.test.sqlite",
    },
    migrations: {
      directory: "./API/db/migrations",
    },
    seeds: {
      directory: "./API/db/seeds",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: process.env.DB_URL,
    migrations: {
      directory: "./API/db/migrations",
    },
    seeds: {
      directory: "./API/db/seeds",
    },
  },
};
