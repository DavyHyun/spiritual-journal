const Journal = require("../models/journalModel");
const asyncHandler = require("express-async-handler");

const createJournal = asyncHandler(async (req, res) => {
  const { verse, passage, content, title, groups } = req.body;
  console.log("USER", req.user);
  if (!verse || !passage || !content) {
    res.status(400);
    throw new Error("Please Fill out Journal Completely");
  } else {
    const journal = new Journal({
      author: req.user._id,
      authorName: req.user.username,
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

const updateJournal = asyncHandler(async (req, res) => {
  console.log("Update Journal Controller called with ID:", req.params.id);
  console.log("Request Body:", req.body);
  console.log("Request Params:", req.params);
  const { verse, passage, content, title, groups } = req.body;
  
  const journal = await Journal.findById(req.params.id);
  console.log(journal);
  if (!journal) {
    res.status(404);
    throw new Error("Journal not found");
  }
  // if (journal.author.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You are not authorized to edit this journal");
  // }

  // if(!verse || !passage || !content){
  //   res.status(400);
  //   throw new Error("Please Fill out Journal Completely");
  // } else {
  //   journal.verse = verse;
  //   journal.passage = passage;
  //   journal.content = content;
  //   journal.title = title;
  //   journal.groups = groups;

  //   const updatedJournal = await journal.save();
  //   res.status(201).json(updatedJournal);
  // }

  if (journal) {
    journal.verse = verse;
    journal.passage = passage;
    journal.content = content;
    journal.title = title;
    journal.groups = groups;

    const updatedJournal = await journal.save();
    res.json(updatedJournal);
  } else {
    res.status(404);
    throw new Error("Journal not found");
  }
});

const deleteJournal = asyncHandler(async (req, res) => {
  console.log("Delete Journal Controller called with ID:", req.params.id);
  console.log("Request Body:", req.body);
  console.log("Request Params:", req.params);
  const journal = await Journal.findById(req.params.id);
  console.log(journal);
  // console.log("USER", journal);
  if (journal.author.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error("You cannot perform this action");
  }

  if (journal) {
    await journal.deleteOne();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
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

const addComment = asyncHandler(async (req, res) => {
  const { text, journalId } = req.body;

  const journal = await Journal.findById(journalId);
  if (!journal) {
    res.status(404);
    throw new Error("Journal not found.");
  }

  const comment = {
    text: text,
    author: req.user._id,
    authorName: req.user.username,
  };

  journal.comments.push(comment);
  await journal.save();
  res.status(200).json({ message: "Added to group successfully." });
});

module.exports = {
  createJournal,
  getPersonalJournal,
  getGroupJournals,
  deleteJournal,
  addComment,
  updateJournal,
};
