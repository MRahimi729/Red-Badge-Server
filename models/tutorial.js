const { DataTypes } = require("sequelize");
const db = require("../db");

const Tutorial = db.define("tutorial", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoURL: {
    type: DataTypes.STRING(1500),
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
    type: DataTypes.STRING,
    allowNull: false,
  },
});

return Tutorial;
