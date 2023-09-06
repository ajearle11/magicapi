const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const fs = require("fs");
const cards = require("./cards.json");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send(cards);
});

module.exports = app;

//How we wrote the jason
// const response = await fetch(
//   "https://api.magicthegathering.io/v1/cards?set=ltr&page=5"
// );
// const data = await response.json();

// let newData = [];
// for (x = 0; x < 62; x++) {
//   newData.push({
//     name: data.cards[x].name,
//     id: Number(data.cards[x].number),
//     image: `https://www.mtgpics.com/pics/reg/ltr/${x + 401}.jpg`,
//   });
// }

// fs.writeFileSync(JSON_FILE, JSON.stringify(newData));

// const response = await fetch("./cards.json");
// const data = await response.json();
