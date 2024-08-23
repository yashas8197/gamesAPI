const express = require("express");
const cors = require("cors");
const app = express();
const { getGames, getGamesById } = require("./controllers/index");
app.use(express.json());
app.use(cors());

app.get("/games", (req, res) => {
  const response = getGames();
  res.json({ response });
});

app.get("/games/details/:id", (req, res) => {
  const response = getGamesById(parseInt(req.params.id));
  res.json({ response });
});

module.exports = { app };
