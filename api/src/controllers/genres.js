require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { GENRE_URL } = require("../../constants.js");
const { API_KEY } = process.env;

function getGenres(req, res, next) {
  const GENRES_API = axios.get(`${GENRE_URL}${API_KEY}`);

  return GENRES_API.then((response) => {
    res.send(response.data);
  }).catch((error) => {
    res.send(error);
  });
}



module.exports = {getGenres}
