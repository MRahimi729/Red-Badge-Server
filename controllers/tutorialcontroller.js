let express = require("express");
const { Tutorial, Comments } = require("../models");
let router = express.Router();
const validateSession = require("../middleware/validate-session");

// const router = Router();
//FIND ALL
// const query = { where: { id: req.user.id } };

/***GET: VIEW A TUTORIAL (ALL the tutorials in the database) - UPDATE To validatesession***/
router.get("/", function (req, res) {
  Tutorial.findAll({
    include: Comments,
  })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ error: err }));
});

/***GET: VIEW A TUTORIAL (ALL the USER tutorials in the database)***/
router.get("/user", validateSession, function (req, res) {
  const query = { where: { userId: req.user.id } };
  Tutorial.findAll(query)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ error: err }));
});

// /***POST: CREATE A TUTORIAL***/

router.post("/create", validateSession, (req, res) => {
  const tutEntry = {
    title: req.body.tutorial.title,
    userId: req.user.id,
    date: req.body.tutorial.date,
    photo_url: req.body.tutorial.photo_url,
    description: req.body.tutorial.description,
    estimatedTime: req.body.tutorial.estimatedTime,
    tools: req.body.tutorial.tools,
    directions: req.body.tutorial.directions,
    ownerId: req.user.id,
  };
  Tutorial.create(tutEntry)
    .then((entry) => res.status(200).json(entry))
    .catch((err) => res.status(500).json({ error: err }));
});
// /***PUT: EDIT A TUTORIAL***/
router.put("/update/:id", validateSession, function (req, res) {
  const updateTutEntry = {
    title: req.body.tutorial.title,
    date: req.body.tutorial.date,
    photo_url: req.body.tutorial.photo_url,
    description: req.body.tutorial.description,
    estimatedTime: req.body.tutorial.estimatedTime,
    tools: req.body.tutorial.tools,
    directions: req.body.tutorial.directions,
  };
  const query = { where: { id: req.params.id, userId: req.user.id } };

  Tutorial.update(updateTutEntry, query)
    .then((entries) => res.status(200).json(entries))
    .catch((err) => res.status(500).json({ error: err }));
});

/***DELETE: DELETE A TUTORIAL (User-specific or Admin-all)***/
router.delete("/delete/:id", validateSession, function (req, res) {
  let query;
  if (req.user.role == "Admin") {
    query = { where: { id: req.params.id } };
  } else {
    query = { where: { id: req.params.id, userId: req.user.id } };
  }
  Tutorial.destroy(query)
    .then((entry) => {
      if (entry !== 0) {
        res.status(200).json({ message: "Tutorial removed" });
      } else {
        res.status(200).json({ message: "No tutorial found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
