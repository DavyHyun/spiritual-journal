const Group = require("../models/groupModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const createGroup = asyncHandler(async (req, res) => {
  const { groupName, groupCode } = req.body;
  const groupExists = await Group.findOne({ groupCode });

  if (groupExists) {
    res.status(404);
    throw new Error("Group Already Exists");
  }

  var members = [];
  members.push(req.user._id);

  if (!groupName || !groupCode) {
    res.status(400);
    throw new Error("Please Fill out Fields Completely");
  } else {
    const group = new Group({
      groupName,
      groupCode,
      members,
    });
    const createdGroup = await group.save();

    res.status(201).json(createdGroup);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { groupCode } = req.body;

  if (!groupCode) {
    res.status(400);
    throw new Error("Group code is required.");
  }

  const group = await Group.findOne({ groupCode });
  if (!group) {
    res.status(404);
    throw new Error("Group not found.");
  }

  // Check if user is already a member to avoid duplicates
  if (!group.members.includes(req.user._id)) {
    group.members.push(req.user._id);
    await group.save();
    res.status(200).json({ message: "Added to group successfully." });
  } else {
    res.status(409);
    throw new Error("User is already a member of this group.");
  }
});

const groupGet = asyncHandler(async (req, res) => {
  console.log("CALLED");
  try {
    // Use await with try-catch for error handling
    const groups = await Group.find({ members: req.user._id });
    console.log(groups); // Logging the groups to console
    res.status(200).json({ groups });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = { createGroup, addToGroup, groupGet };