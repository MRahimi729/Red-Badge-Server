let express = require("express");
const { Favorites } = require("../models");
let router = express.Router();
const validateSession = require("../middleware/validate-session");

//***GET: VIEW ALL FAVORITES FOR A USER***/
router.get("/", function (req, res) {
  Favorites.findAll({ where: { userId: req.user.id } })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ error: err }));
});

// /***POST: SAVE A TUTORIAL TO FAVORITES***/

router.post("/create/:tutorialId", validateSession, (req, res) => {
  const makeFavorite = {
    isFavorite: req.body.favorites.isFavorite,
    userId: req.user.id,
    tutorialId: req.params.tutorialId,
  };
  Favorites.create(makeFavorite)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ error: err }));
});

/***DELETE: REMOVE TUTORIAL FROM FAVORITES***/
router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, userId: req.user.id } };

  Favorites.destroy(query)
    .then((entry) => {
      if (entry !== 0) {
        res.status(200).json({ message: "Comment removed" });
      } else {
        res.status(200).json({ message: "No comment found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});
module.exports = router;
