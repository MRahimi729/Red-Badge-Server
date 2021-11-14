const { DataTypes } = require("sequelize");
const db = require("../db");

const Favorites = db.define("favorites", {
  isFavorite: {
    type: DataTypes.BOOLEAN,
  },
  Tutorial: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Favorites;
