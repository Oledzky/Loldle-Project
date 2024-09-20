const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");

const Comment = require("../models/comment");
const Game = require("../models/game");
const Post = require("../models/post");
const User = require("../models/user");
const Vote = require("../models/vote");

require("dotenv").config();

async function connectToDatabase(callback) {
  console.log("Connecting to database...");
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => {
    console.log("Connected to database!");
    callback();
  });
}

async function clearDatabase() {
  const allModels = [Comment, Game, Post, User, Vote];
  const allPromises = [];
  for (const model of allModels) {
    allPromises.push(model.deleteMany());
  }
  await Promise.all(allPromises);
}

async function readExampleData(callback) {
  fs.readFile(
    path.join(__dirname, "example_data.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error("Failed to read example data:", err);
        return null;
      }
      try {
        const jsonData = JSON.parse(data);
        callback(jsonData);
      } catch (err) {
        console.error("Failed to parse json data:", err);
      }
    }
  );
}

async function addExampleData(data) {
  await addUsers(data.users);
  await addPosts(data.posts);
  console.log("Example data created!");
  process.exit();
}

async function addUsers(allUsers) {
  for (const user of allUsers) {
    const newUser = new User(user);
    await newUser.save();
  }
}

async function addPosts(allPosts) {
  for (const post of allPosts) {
    await addPost(post);
  }
}

async function addPost(post) {
  const postCreator = await User.findOne({
    username: post.author,
  });
  const newPost = new Post({
    author: postCreator,
    title: post.title,
    content: post.content,
  });
  const createdPost = await newPost.save();
  for (const comment of post.comments) {
    await addComentToPost(createdPost, comment);
  }
}

async function addComentToPost(post, comment) {
  const commentAuthor = await User.findOne({
    username: comment.author,
  });
  const newComment = new Comment({
    author: commentAuthor,
    content: comment.content,
    post: post,
  });
  const createdComment = await newComment.save();
  for (const vote of comment.votes) {
    await addVoteToComment(createdComment, vote);
  }
}

async function addVoteToComment(comment, vote) {
  const voter = await User.findOne({
    username: vote.voter,
  });
  const newVote = new Vote({
    user: voter,
    comment: comment,
    isUpvote: vote.isUpvote,
  });
  await newVote.save();
}

async function initDatabase() {
  clearDatabase();
  readExampleData(addExampleData);
}

async function main() {
  connectToDatabase(initDatabase);
}

main();
