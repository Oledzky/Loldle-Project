const Champion = require("../models/champion");
const Game = require("../models/game");

function answerToString(input) {
  if (typeof input === "string") {
    return input;
  } else if (Array.isArray(input)) {
    return input.join(", ");
  } else {
    return input.toString();
  }
}

function validateYear(answer, correct) {
  var color;
  if (answer > correct) {
    color = "redDown";
  } else if (answer < correct) {
    color = "redUp";
  } else {
    color = "green";
  }
  return {
    color: color,
    content: answerToString(answer),
  };
}

function validate(answer, correct) {
  return {
    color: compareSets(answer, correct),
    content: answerToString(answer),
  };
}

function compareSets(arg1, arg2) {
  const list1 = Array.isArray(arg1) ? arg1 : [arg1];
  const list2 = Array.isArray(arg2) ? arg2 : [arg2];

  const set1 = new Set(list1);
  const set2 = new Set(list2);

  const areEqualSets = isEqualSets(set1, set2);
  const haveIntersection = hasIntersection(set1, set2);

  if (areEqualSets) {
    return "green";
  } else if (haveIntersection) {
    return "orange";
  } else {
    return "red";
  }
}

function isEqualSets(set1, set2) {
  if (set1.size !== set2.size) {
    return false;
  }

  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }
  return true;
}

function hasIntersection(set1, set2) {
  for (const item of set1) {
    if (set2.has(item)) {
      return true;
    }
  }
  return false;
}

async function handle(req, res) {
  const [champion, game] = await Promise.all([
    Champion.findOne({
      name: req.query.answer,
    }),
    Game.findOne({
      _id: req.query.gameId,
    }),
  ]);
  const correctChampion = await Champion.findById(game.answer.toString());
  res.json({
    correct: game.answer.toString() === champion._id.toString(),
    name: champion.name,
    gender: validate(champion.gender, correctChampion.gender),
    roles: validate(champion.roles, correctChampion.roles),
    species: validate(champion.species, correctChampion.species),
    resource: validate(champion.resource, correctChampion.resource),
    rangeType: validate(champion.rangeType, correctChampion.rangeType),
    region: validate(champion.region, correctChampion.region),
    year: validateYear(champion.year, correctChampion.year),
  });
}

module.exports = handle;
