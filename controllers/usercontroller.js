let express = require("express");
const { User } = require("../models");
let router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const { Router } = require("express");

const validateSession = require("../middleware/validate-session");

// const router = Router();
/*GET USERS ENDPOINT --NEED TO ADD ADMIN, VALIDATE SESSION here */
router.get("/", function (req, res) {
  User.findAll()
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ error: err }));
});

/***USER SIGNUP***/
router.post("/signup", function (req, res) {
  User.create({
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13),
    role: req.body.user.role,
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      res.json({
        user: user,
        message: "User successfully created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

/***USER SIGNIN***/
router.post("/signin", function (req, res) {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then(function signinSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.user.password,
          user.password,
          (err, matches) => {
            //change req.body.user.passwordhash to password
            if (matches) {
              let token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                {
                  expiresIn: 86400,
                }
              );

              res.status(200).json({
                user: user,
                message: "Signin successful!",
                sessionToken: token,
              });
            } else {
              res.status(502).json({ error: "Signin Failed" });
            }
          }
        );
      } else {
        res.status(500).json({ error: "User not found!" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

/***DELETE USER (ADMIN)***/
router.delete("/delete/:id", validateSession, function (req, res) {
  let query;
  if (req.user.role == "admin") {
    query = { where: { id: req.params.id } };
  } else {
    query = { where: { id: req.params.id, userId: req.user.id } };
  }
  User.destroy(query)
    .then((entry) => {
      if (entry !== 0) {
        res.status(200).json({ message: "User removed" });
      } else {
        res.status(200).json({ message: "No user found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
