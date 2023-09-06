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
  res.send({
    message:
      "Hello. Welcome to the MTG Lords of the Rings: Tales of Middle-Earth LTR card api! You can find images of your favourite cards. /cards will show all the cards. /cards/search/{query} will search by your query. /cards/id/{query} will find a card by its number",
  });
});

app.get("/cards", async (req, res) => {
  res.send(cards);
});

app.get("/cards/search/:name", async (req, res) => {
  const { name } = req.params;
  const arr = [];
  const card = cards.forEach((card) => {
    if (card.name.toLowerCase().includes(name.toLowerCase())) {
      arr.push(card);
    }
  });
  res.send(arr);
});

app.get("/cards/id/:id", async (req, res) => {
  const { id } = req.params;
  const card = cards.filter((cardP) => {
    return parseInt(id) == cardP.id;
  });
  res.send(card);
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
