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
  try {
    res.status(200).send({
      message:
        "Hello. Welcome to the MTG Lords of the Rings: Tales of Middle-Earth LTR card api! You can find images of your favourite cards. /cards will show all the cards. /cards/search/{query} will search by your query. /cards/id/{query} will find a card by its number",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cards", async (req, res) => {
  try {
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cards/search/:name", async (req, res) => {
  const { name } = req.params;
  const arr = [];
  try {
    const card = cards.forEach((card) => {
      if (card.name.toLowerCase().includes(name.toLowerCase())) {
        arr.push(card);
      }
    });

    arr.length === 0
      ? res.status(404).send({ error: "We could not find any cards" })
      : res.status(200).send(arr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cards/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const card = cards.filter((card) => {
      return parseInt(id) == card.id;
    });
    card.length === 0
      ? res
          .status(404)
          .send({ error: "We could not find any card with that number" })
      : res.status(200).send(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;

//How we wrote the json
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
