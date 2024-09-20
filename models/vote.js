const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  isUpvote: {
    type: Boolean,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
