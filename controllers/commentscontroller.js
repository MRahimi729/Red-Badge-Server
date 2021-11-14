let express = require("express");
const { Comments } = require("../models");
let router = express.Router();
const validateSession = require("../middleware/validate-session");

/***GET: VIEW COMMENTS (ALL the comments in a tutorial)***/
// router.get("/", validateSession, async (req, res) {
//     try {
//         const comments = await Comments.findAll({
//             where: {tutorialID: req.tutorial.id},
//         });
//         res.status(200).json({ comments });
//     } catch (error) {
//         res.status(500).json({error});
//     }
// });

// router.get("/:tutorialId", validateSession, function (req, res) {
//   const query = { where: { tutorialId: req.tutorial.id } };
//   Comments.findAll(query)
//     .then((post) => res.status(200).json(post))
//     .catch((err) => res.status(500).json({ error: err }));
// });

/*GET TUTORIAL COMMENTS*/
router.get("/:tutorialId", validateSession, function (req, res) {
  let tutorialId = req.params.tutorialId;

  Comments.findAll({
    where: { tutorialId: tutorialId },
  })
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});
// /***POST: CREATE A COMMENT IN A TUTORIAL***/

router.post("/create/:tutorialId", validateSession, (req, res) => {
  const createComment = {
    comment: req.body.comment.comment,
    date: req.body.comment.date,
    userId: req.user.id,
    tutorialId: req.params.tutorialId,
  };
  Comments.create(createComment)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ error: err }));
});
// /***PUT: EDIT A COMMENT***/
router.put("/update/:id", validateSession, function (req, res) {
  const updateComment = {
    comment: req.body.comment.comment,
  };
  const query = { where: { id: req.params.id, userId: req.user.id } };

  Comments.update(updateComment, query)
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});

/***DELETE: DELETE A COMMENT (User-specific or Admin-all)***/
router.delete("/delete/:id", validateSession, function (req, res) {
  let query;
  if (req.user.role == "admin") {
    query = { where: { id: req.params.id } };
  } else {
    query = { where: { id: req.params.id, userId: req.user.id } };
  }
  Comments.destroy(query)
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
