const express = require("express");
const { sequelize } = require("./models");

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  const { name, email, role } = req.body;
});

async function main() {
  await sequelize.sync();
}

main();
