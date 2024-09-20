const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const Vote = require("../models/vote");
const mongoose = require("mongoose");

async function getVoteScore(commentId) {
  const allVotes = await Vote.find({
    comment: commentId.toString(),
  });
  var result = 0;
  for (const vote of allVotes) {
    result += vote.isUpvote ? 1 : -1;
  }
  return result;
}

async function handle(req, res) {
  const postId = req.query.id;
  const post = await Post.findOne({
    _id: postId,
  });
  const postAuthor = await User.findOne({
    _id: post.author,
  });
  if (post === null) {
    res.render("forumThread", {
      postExists: false,
    });
    return;
  }
  const comments = await Comment.find({
    post: post,
  });
  for (let i = 0; i < comments.length; i++) {
    const commentAuthor = await User.findById(comments[i].author.toString());
    comments[i].authorName = commentAuthor.username || "<UNKNOWN>";
    comments[i].voteScore = await getVoteScore(comments[i]._id);
    comments[i].time = comments[i].createdAt.toLocaleString();
  }
  res.render("forumThread", {
    createdBy: postAuthor.username,
    createdAt: post.createdAt.toLocaleString(),
    postId: req.query.id,
    postExists: true,
    postTitle: post.title,
    postContent: post.content,
    comments: comments,
  });
}

module.exports = handle;
