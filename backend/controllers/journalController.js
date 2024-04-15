const Journal = require("../models/journalModel");
const asyncHandler = require("express-async-handler");

const createJournal = asyncHandler(async (req, res) => {
  const { verse, passage, content } = req.body;

  if (!verse || !passage || !content) {
    res.status(400);
    throw new Error("Please Fill out Journal Completely");
  } else {
    const journal = new Journal({
      author: req.user._id,
      verse,
      passage,
      content,
    });
    const createdJournal = await journal.save();

    res.status(201).json(createdJournal);
  }
});

module.exports = { createJournal };
