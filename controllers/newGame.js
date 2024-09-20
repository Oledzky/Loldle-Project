const Champion = require("../models/champion");
const Game = require("../models/game");

async function handle(req, res) {
  const randomChampions = await Champion.aggregate([{ $sample: { size: 1 } }]);
  const newGame = new Game({
    answer: randomChampions[0]._id,
  });
  const createdGame = await newGame.save();
  console.log(
    "New game created with id:",
    createdGame._id,
    "Answer:",
    randomChampions[0].name
  );
  res.redirect("/game?id=" + createdGame._id);
}

module.exports = handle;
