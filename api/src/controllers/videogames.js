require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { BASE_URL } = require("../../constants.js");
const { API_KEY } = process.env;

function getGames(req, res, next) {
  /* const { page } = req.query; */
  const { name } = req.query; //Query es clave y valor --> ?name=nombreDelVideojuego
  if (name) {
    /* console.log(name, "Este es el name"); */
    return axios
      .get(`${BASE_URL}?search=${name}&page_size=40&${API_KEY}`)
      .then((response) => {
        return res.send(response.data.results); //Al hacer el llamado con Axios, para poder acceder al dato necesito hacer .data.results
      })
      .catch((error) => res.send(error));
  }
  /*  console.log(page); */
  const GAMES_API = axios.get(`${BASE_URL}?page_size=40&${API_KEY}`);
  const GAMES_DB = Videogame.findAll({ include: Genre }); //Con Sequelize realizo una promesa en donde busco los Juegos de la Base de datos.Si quiero que me diga el genero al que pertenece el juego tengo que hacer el {include: Genre}

  Promise.all([GAMES_API, GAMES_DB])
    .then((response) => {
      //El promiseAll es para resolver las 2 promesas al mismo tiempo
      let [GAMES_API_RESPONSE, GAMES_DB_RESPONSE] = response; //En esta linea ejecuta las 2 promesas con el response y guarda los valores en GAMES_API_RESPONSE y en GAMES_DB_RESPONSE.
      var videogames = []; // Creo un arreglo vacio donde voy a juntar GAMES_API_RESPONSE y GAMES DB_RESPONSE
      videogames = GAMES_DB_RESPONSE.map((v) => v.dataValues); //Como la info que hay en GAMES DB esta guardada de una forma particular, logro acceder con el . y luego v.dataValues y la guardo en videgoames"

      /*  console.log("Estos son los videogames", videogames); */

      var array = videogames.concat(GAMES_API_RESPONSE.data.results); //En array concateno la info que tengo en videogames con la de GAMES_API_RESPONSE (El.data es porque para acceder a la informacion necesito hacerlo de esa manera).

      /*  console.log(array); */
      /* console.log("Aca esta el resultado", array); */
      /* cconsole.log("Lo que viene de la API", GAMES_API_RESPONSE);*/
      /* console.log("Lo que viene de la DB", GAMES_DB_RESPONSE); */

      return res.send(array);
    })
    .catch((error) => console.log(error));
}

function searchGameById(req, res, next) {
  const { id } = req.params; //Captura los parametros que se envien desde la URL.Al ser params es un numero
  console.log("Este es el ID:", id);
  if (id && id.length < 5) {
    return axios
      .get(`${BASE_URL}/${id}?${API_KEY}`) //Llamado a la API con el End point permitido.
      .then((response) => {
        console.log(response.data); //El data es para acceder a la informacion
        res.send(response.data);
      })
      .catch((error) => res.send(error));
  } else {
    return Videogame.findOne({
      where: {
        id,
      },
    })
    .then((response) => {
      console.log("Este es el juego que busco por ID:", response);
      return res.send(response);
    });
  }
}
//5fde775c-3e11-43d5-89bb-5c91ae70d456
//const GAMES_DB = Videogame.findAll({ include: Genre });

function createGame(req, res, next) {
  const { name, description, date, rating, genres, platforms } = req.body; //Me llegan del formulario del body.

  const newGame = {
    id: uuidv4(), //Creo un numero unico de ID. EL resto viene del form.
    name,
    description,
    date,
    rating,
    genres,
    platforms,
  };

  Videogame.create(newGame) //create es una funcion de Sequilize para crear entidades. Le paso el objeto newGame de arriba
    .then((videogame) => {
      genres.forEach(
        (
          g //Por cada genero que tiene el objeto newGame, voy a buscar a un genero en mi base de datos que coincida con los que selecciono el usuario
        ) =>
          Genre.findByPk(g.id)
            .then((resp) => {
              console.log(resp);

              videogame.addGenre(resp); //Al videogame creado le agrego un genero con la funcion "add" y la entidad Genre
            })
            .catch((err) => console.log(err))
      );
    })
    .catch((error) => console.log(error));
}

module.exports = { getGames, searchGameById, createGame };
