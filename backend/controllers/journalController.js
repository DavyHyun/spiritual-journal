const Journal = require("../models/journalModel");
const asyncHandler = require("express-async-handler");

const createJournal = asyncHandler(async (req, res) => {
  const { verse, passage, content, title, groups } = req.body;

  if (!verse || !passage || !content) {
    res.status(400);
    throw new Error("Please Fill out Journal Completely");
  } else {
    const journal = new Journal({
      author: req.user._id,
      verse,
      passage,
      content,
      title,
      groups,
    });
    const createdJournal = await journal.save();

    res.status(201).json(createdJournal);
  }
});

const getPersonalJournal = asyncHandler(async (req, res) => {
  try {
    // Use await with try-catch for error handling
    const journals = await Journal.find({ author: req.user._id });
    res.status(200).json({ journals });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

const getGroupJournals = asyncHandler(async (req, res) => {
  console.log("CALLED GROUP", req.body);
  const { groupID } = req.body;

  console.log(groupID);
  try {
    // Use await with try-catch for error handling
    const journals = await Journal.find({ groups: groupID });
    console.log("GROUP", journals); // Logging the groups to console
    res.status(200).json({ journals });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = { createJournal, getPersonalJournal, getGroupJournals };
