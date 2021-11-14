const User = require("./user");
const Tutorial = require("./tutorial");
const Comments = require("./comment");
const Favorites = require("./favorites");
// const { hasMany } = require("./user");
// create individual files for your models and import them here

// Setup Associations
//one-to-one => hasOne, belongsTo
//one-to-many => hasMany, belongsTo
//many-to-many => hasMany, belongsToMany

User.hasMany(Tutorial);
Tutorial.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);
Comments.belongsTo(Tutorial);

User.hasMany(Favorites);
Favorites.belongsTo(User);

Tutorial.hasMany(Favorites);
Favorites.belongsTo(Tutorial);

Tutorial.hasMany(Comments);

module.exports = {
  User,
  Tutorial,
  Comments,
  Favorites,
};
