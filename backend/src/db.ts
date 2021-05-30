import knex from "knex";
import DB_CONFIG from "./knexfile";

export default knex(
  DB_CONFIG[process.env["NODE_ENV"] as "development" | "production" | "test"]
);
