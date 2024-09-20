const Comment = require("../models/comment");
const User = require("../models/user");

async function handle(req, res) {
  if (res.locals.loggedUser === null) {
    res.status(400).send("ERROR1");
    return;
  }
  const sendingUser = await User.findOne({
    username: res.locals.loggedUser,
  });
  if (sendingUser === null) {
    res.status(400).send("ERROR2");
    return;
  }
  const commentId = req.query.commentId;
  const comment = await Comment.findById(commentId);
  if (comment === null) {
    res.status(400).send("ERROR3");
    return;
  }
  if (comment.author.toString() != sendingUser._id.toString()) {
    res.status(400).send("ERROR4");
    return;
  }
  await Comment.deleteOne({
    _id: comment._id,
  });
  res.status(200).send("OK");
}

module.exports = handle;
