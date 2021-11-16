const { DataTypes } = require("sequelize");
const db = require("../db");

const Comments = db.define("comment", {
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Comments;
