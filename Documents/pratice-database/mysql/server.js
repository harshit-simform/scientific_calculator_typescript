// import mysql from "mysql2";
// import dotenv from "dotenv";
const { Sequelize, QueryTypes } = require("sequelize");
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// const pool = mysql
//   .createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE,
//   })
//   .promise();

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`server listening on port ${port}`);
// });

// export default pool;

const sequelize = new Sequelize("mysqlPractical", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const port = process.env.PORT || 3000;

// sequelize
//   .query("SELECT * FROM user", { type: QueryTypes.SELECT })
//   .then((users) => {
//     console.log(users);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// console.log(sequelize);

module.exports = sequelize;
const app = require("./app.js");
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
