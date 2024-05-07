const express = require("express");
const {
  createJournal,
  getPersonalJournal,
  getGroupJournals,
} = require("../controllers/journalController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/create").post(protect, createJournal);
router.route("/personal").get(protect, getPersonalJournal);
router.route("/group").post(getGroupJournals);

module.exports = router;
