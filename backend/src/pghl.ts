require("ts-node/register");
require("dotenv").config({ path: `${__dirname}/../.env` });
import postgraphile from "postgraphile";
import PgAggregatesPlugin from "@graphile/pg-aggregates";

export default postgraphile(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    port: 5432,
  },
  "shop",
  {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    appendPlugins: [PgAggregatesPlugin],
  }
);
