const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

async function handle(req, res) {
  if (res.locals.loggedUser === null) {
    res.redirect("/");
    return;
  }
  const user = await User.findOne({
    username: res.locals.loggedUser,
  });
  if (user === null) {
    res.redirect("/logout");
  }
  const postId = req.body.postId;
  const post = await Post.findOne({
    _id: postId,
  });
  const newComment = new Comment({
    content: req.body.comment,
    author: user,
    post: post,
  });
  const createdComment = await newComment.save();
  console.log("Created new comment with id:", createdComment._id);
  res.redirect("/forumThread?id=" + postId);
}

module.exports = handle;
