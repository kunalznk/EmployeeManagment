import { Sequelize } from "sequelize";
require("dotenv").config();

const DB_HOST_NAME = process.env.DB_HOST_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const sequelize = new Sequelize( "empdept" , "kunal" , "kunal@123" , {
  dialect: 'postgres',
}
);

try {
  sequelize.authenticate();

  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default sequelize;