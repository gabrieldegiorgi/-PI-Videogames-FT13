require("dotenv").config();
const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { BASE_URL } = require("../../constants.js");
const {API_KEY} = process.env


function getGames (req, res, next){
    const GAMES_API = axios.get(`${BASE_URL}${API_KEY}`)
    const GAMES_DB = Videogame.findAll({include:Genre})

    Promise.all([GAMES_API, GAMES_DB]).then((response)=>{
        const [GAMES_API_RESPONSE, GAMES_DB_RESPONSE] = response;
        const array = GAMES_DB_RESPONSE.concat(GAMES_API_RESPONSE.data);
        return res.send(array)     
    })
}
module.exports = {getGames};
