// this version follows sequelize docs

const express = require("express");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

const sequelize = new Sequelize(
  "postgres://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@" +
    process.env.DB_HOST +
    ":" +
    process.env.DB_PORT +
    "/" +
    process.env.DB_NAME
);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
    await sequelize.sync({ force: true });
    console.log("Synced database.");
  } catch (error) {
    console.log(error);
  }
};
connectToDb();

app.get("/", (req, res) => {
  console.log("ran");
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
