const express = require("express");
const {
  createGroup,
  addToGroup,
  groupGet,
  getCodes,
} = require("../controllers/groupController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/create").post(protect, createGroup);
router.route("/add").post(protect, addToGroup);
router.route("/get").get(protect, groupGet);
router.route("/codes").get(getCodes);

module.exports = router;
