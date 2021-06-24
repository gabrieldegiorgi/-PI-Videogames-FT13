require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { GENRE_URL } = require("../../constants.js");
const { API_KEY } = process.env;

function getGenres(req, res, next) {
  Genre.findAll({ include: Videogame })
    .then((genres) => {
      if (!genres.length) {
        axios
          .get(`${GENRE_URL}?${API_KEY}`)
          .then((response) => {
            console.log(
              "Esto es la respuesta de los generos",
              response.data.results
            );
            const array = [];
            response.data.results.forEach((g) => {
              array.push({
                id: uuidv4(),
                name: g.name,
              });
            });

            Genre.bulkCreate(array, { returnig: true })
              .then((data) => res.send(data))
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
}

module.exports = { getGenres };
