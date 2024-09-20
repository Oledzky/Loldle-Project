const Post = require("../models/post");
const User = require("../models/user");

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
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: user,
  });
  newPost.save().then((post) => {
    console.log("Created new post with id:", post._id);
    res.redirect("/forumThread?id=" + post._id);
  });
}

module.exports = handle;
