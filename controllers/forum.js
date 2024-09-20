const Post = require("../models/post");
require("dotenv").config();

const postsPerPage = 2;

async function handle(req, res) {
  const page = parseInt(req.query.page) || 1;
  const posts = await Post.find();
  posts.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });
  const startIndex = postsPerPage * (page - 1);
  const endIndex = startIndex + postsPerPage;
  const maxPage = Math.ceil(posts.length / postsPerPage);
  res.render("forum", {
    posts: posts.slice(startIndex, endIndex),
    currentPage: page,
    maxPage: maxPage,
  });
}

module.exports = handle;
