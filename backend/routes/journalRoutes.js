const express = require("express");
const {
  createJournal,
  getPersonalJournal,
  getGroupJournals,
  deleteJournal,
  addComment,
} = require("../controllers/journalController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/create").post(protect, createJournal);
router.route("/personal").get(protect, getPersonalJournal);
router.route("/group").post(getGroupJournals);
router.route("/comment").post(protect, addComment);
router
  .route("/:id")
  // .get(getNoteById)
  // .put(protect, updateNote)
  .delete(protect, deleteJournal);
router.route("/:postId/groups")
  .put(protect, updateJournalGroups);

module.exports = router;
