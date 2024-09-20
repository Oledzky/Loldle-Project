const Champion = require("../models/champion");
const Game = require("../models/game");
const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");
const Vote = require("../models/vote");

const collectionsMap = {
  champion: Champion,
  game: Game,
  comment: Comment,
  post: Post,
  user: User,
  vote: Vote,
};

async function getAll(collection) {
  return await collection.find();
}

async function handle(req, res) {
  const table = req.query.table;
  const model = collectionsMap[table];
  if (model === undefined) {
    res.json("Wrong table name: " + table);
  } else {
    res.json(await getAll(model));
  }
}

module.exports = handle;
