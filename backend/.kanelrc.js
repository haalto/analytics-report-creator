const path = require("path");
require("dotenv").config();
module.exports = {
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  schemas: [
    {
      name: "shop",
      modelFolder: path.join(__dirname, "src", "generated_types"),
    },
  ],
};
