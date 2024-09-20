const Champion = require("../models/champion");

async function handle(req, res) {
  const gameId = req.query.id;
  const allChampionNames = [];
  const allChampions = await Champion.find();
  for (const champion of allChampions) {
    allChampionNames.push(champion.name);
  }
  res.render("game", {
    gameId: gameId,
    allChampionsString: JSON.stringify(allChampionNames),
    allChampions: allChampionNames,
  });
}

module.exports = handle;
