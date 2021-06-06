require("ts-node/register");
require("dotenv").config({ path: `${__dirname}/../.env` });

const DB_CONFIG = {
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./migrations",
  },
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    timezone: "UTC",
  },
  test: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    timezone: "UTC",
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    timezone: "UTC",
  },
};

export default DB_CONFIG;
