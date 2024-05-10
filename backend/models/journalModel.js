const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User model
    },
    authorName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

const journalSchema = mongoose.Schema(
  {
    verse: {
      type: String,
      required: true,
    },

    passage: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },

    authorName: {
      type: String,
      required: true,
    },

    isPersonal: {
      type: Boolean,
      require: false,
    },
    title: {
      type: String,
      require: false,
    },

    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Groups", // Reference to the Group model
      },
    ],

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
