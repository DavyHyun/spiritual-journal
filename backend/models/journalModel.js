const mongoose = require("mongoose");

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

    isPersonal: {
      type: Boolean,
      require: false,
    },

    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Groups", // Reference to the Group model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;
