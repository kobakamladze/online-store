import { config } from "dotenv";
import express from "express";
import cors from "cors";
import sequelize from "./db.js";

import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiidleware.js";

config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, err =>
      err ? console.log(err) : console.log(`Listening on PORT: ${PORT}...`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
