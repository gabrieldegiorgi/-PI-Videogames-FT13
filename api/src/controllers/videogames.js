require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { BASE_URL } = require("../../constants.js");
const { API_KEY } = process.env;
const {paginate} = require("../utils/index.js")



function getGames(req, res, next) {
  const {page} = req.query;

  const { name } = req.query;
  console.log(name, "Este es el name")
  if (name) {
    return axios
      .get(`${BASE_URL}?search=${name}&page_size=15&${API_KEY}`)
      .then((response) => {
        return res.send(response.data.results);
      })
      .catch((error) => res.send(error));
  }
  
  console.log(page)
  const GAMES_API = axios.get(`${BASE_URL}?page_size=15&${API_KEY}`);
    const GAMES_DB = Videogame.findAll({ include: Genre }); // Si quiero que me diga el genero al que pertenece el juego tengo que hacer el include

  Promise.all([GAMES_API, GAMES_DB]).then((response) => { //El promiseALL es para resolver las 2 promesas al mismo tiempo
    const [GAMES_API_RESPONSE, GAMES_DB_RESPONSE] = response;
    const array = GAMES_DB_RESPONSE.concat(GAMES_API_RESPONSE.data);
   /*  console.log(array) */
    return res.send(array[0].results);
  });
}

function searchGameById(req, res, next) {
  const { id } = req.params; //Captura los parametros que se envien desde la URL
  console.log("este es el ID:", id)
  if (id) {
    return axios
      .get(`${BASE_URL}/${id}?${API_KEY}`)
      .then((response) => {
        console.log(response.data)
        res.send(response.data);
      })
      .catch((error) => res.send(error));
  }
}
/* function searchGameByName(req, res, next) {
  const { name } = req.query;
  console.log(name, "Este es el name")
  if (name) {
    return axios
      .get(`${BASE_URL}?search=${name}${API_KEY}`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => res.send(error));
  }
} */

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

module.exports = { getGames, searchGameById, createGame };
