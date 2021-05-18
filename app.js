require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3000;
const { sequelize } = require("./models");
const app = express();

app.get("/", async (req, res) => {
  return res.send("Hello");
});

app.post("/create-user", async () => {
  const { name, email, role } = req.body;

  try {
    const user = await User.create({ name, email, role });
    return res.json(user);
  } catch (error) {
    return res.status(500).json(err);
  }
});

app.listen(PORT, async () => {
  await sequelize.sync({ force: true });
  console.log(`Running on port: ${PORT}`);
});
