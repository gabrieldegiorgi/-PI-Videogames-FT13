require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { BASE_URL } = require("../../constants.js");
const { API_KEY } = process.env;

function getGames(req, res, next) {
  const GAMES_API = axios.get(`${BASE_URL}${API_KEY}`);
  const GAMES_DB = Videogame.findAll({ include: Genre });

  Promise.all([GAMES_API, GAMES_DB]).then((response) => {
    const [GAMES_API_RESPONSE, GAMES_DB_RESPONSE] = response;
    const array = GAMES_DB_RESPONSE.concat(GAMES_API_RESPONSE.data);
    return res.send(array);
  });
}

function searchGameById(req, res, next) {
  const { id } = req.params; //Captura los parametros que se envien desde la URL
  if (id) {
    return axios
      .get(`${BASE_URL}/${id}${API_KEY}`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => res.send(error));
  }
}
function searchGameByName(req, res, next) {
  const { name } = req.query;
  if (name) {
    return axios
      .get(`${BASE_URL}?search=${name}${API_KEY}`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => res.send(error));
  }
}

function createGame(req, res, next) {
  const { name, description, date, rating, platforms } = req.body;
  const newGame = {
    id: uuidv4(),
    name,
    description,
    date,
    rating,
    platforms,
  };

  return Videogame.create(newGame)
    .then((response) => {
      res.send(response.dataValues);
    })
    .catch((error) => res.send(error));
}

module.exports = { getGames, searchGameById, searchGameByName, createGame };
