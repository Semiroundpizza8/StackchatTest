const { Client } = require("pg"); // imports the pg module

const PORT = 5432;
const dbName = "stackchattest";

const client = new Client(`postgres://localhost:${PORT}/${dbName}`);

module.exports = {
  client,
  sql: async (string) => string[0],
};
