const User = require("../models/user");
const Comment = require("../models/comment");
const Vote = require("../models/vote");

async function handle(req, res) {
  const commentId = req.query.commentId;
  const username = req.query.username;
  const isUpvote = req.query.isUpvote === "1";

  const comment = await Comment.findById(commentId);
  if (comment === null) {
    res.json(0);
    return;
  }
  const user = await User.findOne({
    username: username,
  });
  if (user === null) {
    res.json(0);
    return;
  }

  const previousVote = await Vote.findOne({
    comment: comment,
    user: user,
  });
  if (previousVote === null) {
    const newVote = new Vote({
      user: user,
      comment: comment,
      isUpvote: isUpvote,
    });
    const createdVote = await newVote.save();
    if (createdVote === null) {
      res.json(0);
    } else {
      res.json(createdVote.isUpvote ? 1 : -1);
    }
  } else {
    if (previousVote.isUpvote === isUpvote) {
      res.json(0);
      return;
    }
    previousVote.isUpvote = isUpvote;
    const result = await Vote.updateOne(
      { _id: previousVote._id },
      { $set: previousVote }
    );
    res.json(isUpvote ? 2 : -2);
  }
}

module.exports = handle;
