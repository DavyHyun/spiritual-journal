const express = require("express");
const {
  createGroup,
  addToGroup,
  groupGet,
  getCodes,
  leaveGroup,
} = require("../controllers/groupController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route("/create").post(protect, createGroup);
router.route("/add").post(protect, addToGroup);
router.route("/get").get(protect, groupGet);
router.route("/codes").get(getCodes);
router.route("/leave").post(protect, leaveGroup);

module.exports = router;
