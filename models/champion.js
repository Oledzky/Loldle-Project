const mongoose = require("mongoose");

const championSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
  species: {
    type: [String],
    required: true,
  },
  resource: {
    type: [String],
    required: true,
  },
  rangeType: {
    type: [String],
    required: true,
  },
  region: {
    type: [String],
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Champion", championSchema);
