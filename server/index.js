import { config } from "dotenv";
import express from "express";
import sequelize from "./db.js";

config();

const app = express();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, (err) =>
      err ? console.log(err) : console.log(`Listening on PORT: ${PORT}...`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
