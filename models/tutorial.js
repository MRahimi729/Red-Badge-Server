const { DataTypes } = require("sequelize");
const db = require("../db");

const Tutorial = db.define("tutorial", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estimatedTime: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tools: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  directions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Tutorial;
