const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Yo");
});

module.exports = app;
