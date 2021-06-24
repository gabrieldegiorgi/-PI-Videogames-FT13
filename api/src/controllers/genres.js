require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { GENRE_URL } = require("../../constants.js");
const { API_KEY } = process.env;

function getGenres(req, res, next) {
  console.log("Entre a genres");
  Genre.findAll({ include: Videogame }) //Busco los generos de la base datos
    .then((genres) => {
      if (!genres.length) {
        //Si no hay generos en la base de datos, los voy a buscar con el axis
        axios
          .get(`${GENRE_URL}?${API_KEY}`) //Hago el llamado a la API con la API KEY
          .then((response) => {
            /*  console.log(
              "Esto es la respuesta de los generos",
              response.data.results
            ); */
            const array = [];
            response.data.results.forEach((g) => {
              //A cada genero que esta dentro del response.data.results, le asigno un ID unico y me quedo con el nommbre. Todo eso lo pusheo en el array que estaba vacio mas arriba.
              array.push({
                id: uuidv4(),
                name: g.name,
              });
            });

            Genre.bulkCreate(array, { returnig: true }) //Los guarda en la base de datos. El bulk Create es una promesa que me permite crear muchas entidades al mismo tiempo. Le paso como parametro el arreglo con todos los generos y el "{ returnig: true }" es un metodo propio de Bulk
              .then((data) => res.send(data)) //Como es una promesa, le puedo hacer el .then y el .catch
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      } else {
        return res.send(genres);
      }
    })
    .catch((error) => console.log(error));
}

module.exports = { getGenres };
