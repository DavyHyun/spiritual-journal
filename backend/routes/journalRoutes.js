const express = require("express");
const { createJournal } = require("../controllers/journalController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/create").post(protect, createJournal);

module.exports = router;
