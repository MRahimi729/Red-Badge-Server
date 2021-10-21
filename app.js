//DEVELOP BRANCH
require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./db");

// Import middlewares as a bundle
app.use(require("./middleware/headers"));

// Import controllers as a bundle
const controllers = require("./controllers");

sequelize.sync({
  // force: true,
});
// Parse the body of all requests as JSON
app.use(express.json());
let user = require("./controllers/usercontroller");

app.use("/user", user);
// app.use("/user", controllers.User);
// app.use("/tutorial", controllers.Tutorial);
// app.use("/comments", controllers.Comments);
// app.use("/favorites", controllers.Favorites);

// const resetDatabase = { force: true };
// db.authenticate()
//   // add a resetDatabase inside the db.sync to drop all your tables if needed
//   // example:  .then(() => db.sync(resetDatabase))
//   .then(() => db.sync())
//   .then(() =>
//     app.listen(process.env.PORT, () => {
//       console.log(
//         `[server]: App is listening on ${process.env.PORT} 🔥 🔥 🔥 🔥`
//       );
//     })
//   )
//   .catch((e) => {
//     console.log("[server]: Server Crashed 😠 😠 😠 😠 ");
//     console.log(e);
//   });
app.listen(3000, function () {
  console.log("Listening on Port 3000");
});
