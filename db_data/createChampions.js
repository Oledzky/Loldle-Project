const mongoose = require("mongoose");
const Champion = require("../models/champion");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

function readChampionsData(doneCallback) {
  fs.readFile(
    path.join(__dirname, "champions_data.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      try {
        const jsonData = JSON.parse(data);
        doneCallback(jsonData);
      } catch (parseErr) {
        console.error(parseErr);
      }
    }
  );
}

async function saveChampionsInDatabase(championsData) {
  if (championsData === null) {
    console.log("Failed to read file with champions data");
    return;
  }
  console.log("Connecting to database...");
  mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on("error", (error) => console.error(error));
  db.once("open", () => {
    Champion.deleteMany({}).then(async (result) => {
      for (const champion of championsData) {
        console.log("Saving champion to database: ", champion.name);
        const newChampion = new Champion(champion);
        await newChampion.save();
      }
      process.exit(0);
    });
  });
}

readChampionsData(saveChampionsInDatabase);
