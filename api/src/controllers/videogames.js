require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { BASE_URL } = require("../../constants.js");
const { API_KEY } = process.env;
const { paginate } = require("../utils/index.js");

function getGames(req, res, next) {
  const { page } = req.query;
  const { name } = req.query;
  if (name) {
    console.log(name, "Este es el name");
    return axios
      .get(`${BASE_URL}?search=${name}&page_size=40&${API_KEY}`)
      .then((response) => {
        return res.send(response.data.results);
      })
      .catch((error) => res.send(error));
  }
  console.log(page);
  const GAMES_API = axios.get(`${BASE_URL}?page_size=10&${API_KEY}`);
  const GAMES_DB = Videogame.findAll({ include: Genre }); // Si quiero que me diga el genero al que pertenece el juego tengo que hacer el include

  Promise.all([GAMES_API, GAMES_DB])
    .then((response) => {
      //El promiseAll es para resolver las 2 promesas al mismo tiempo
      let [GAMES_API_RESPONSE, GAMES_DB_RESPONSE] = response; //En esta linea ejecuta las 2 promesas con el response y guarda los valores en GAMES_API_RESPONSE y en GAMES_DB_RESPONSE
      var videogames = []; // Creo un arreglo vacio donde voy a juntar GAMES_API_RESPONSE y GAMES DB_RESPONSE
      videogames = GAMES_DB_RESPONSE.map((v) => v.dataValues); //Como la info que hay en GAMES DB esta guardada de una forma particular, logro acceder con el .map y la guardo en videgoames"
      /*  console.log("Estos son los videogames", videogames); */

      var array = videogames.concat(GAMES_API_RESPONSE.data.results); //En array concateno la info que tengo en videogames con la de GAMES_API_RESPONSE (El.data es porque para acceder a la informacion necesito hacerlo de esa manera)
      /*  console.log(array); */
      console.log("Aca esta el resultado", array);
      /* cconsole.log("Lo que viene de la API", GAMES_API_RESPONSE);*/
      /* console.log("Lo que viene de la DB", GAMES_DB_RESPONSE); */
      return res.send(array);
    })
    .catch((error) => console.log(error));
}

function searchGameById(req, res, next) {
  const { id } = req.params; //Captura los parametros que se envien desde la URL
  console.log("este es el ID:", id);
  if (id) {
    return axios
      .get(`${BASE_URL}/${id}?${API_KEY}`)
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => res.send(error));
  }
}

function createGame(req, res, next) {
  const { name, description, date, rating, genres, platforms } = req.body;

  const newGame = {
    id: uuidv4(),
    name,
    description,
    date,
    rating,
    genres,
    platforms,
  };
  console.log("Este es el newGame", newGame);

  return Videogame.create(newGame)
    .then((response) => {
      return res.send(response.dataValues);
    })
    .catch((error) => res.send(error));
}

module.exports = { getGames, searchGameById, createGame };
