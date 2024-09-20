const mongoose = require("mongoose");
const Champion = require("./champion");

const gameSchema = new mongoose.Schema({
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Champion",
    required: true,
  },
});

module.exports = mongoose.model("Game", gameSchema);
