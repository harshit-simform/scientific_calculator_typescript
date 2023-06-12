const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: process.env.DATABASE_DIALECT,
  }
);

const connection = {};
connection.sequelize = sequelize;
connection.Sequelize = Sequelize;
connection.Model = Model;
connection.DataTypes = DataTypes;

module.exports = connection;
