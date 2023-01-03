import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

export default new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
  }
);
