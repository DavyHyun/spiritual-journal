const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
    },

    groupCode: {
      type: String,
      required: true,
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
