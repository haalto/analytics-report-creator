require("dotenv").config();
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import postgraphile from "./pghl";
import PgAggregatesPlugin from "@graphile/pg-aggregates";
const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(postgraphile);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
