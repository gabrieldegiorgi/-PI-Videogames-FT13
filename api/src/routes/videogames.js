const { Router } = require("express");
const {getGames, searchGameById, createGame} = require("../controllers/videogames.js")


const router = Router();
router.get("/", getGames);
router.get("/:id", searchGameById);
/* router.get("?name=", searchGameByName); */
router.post("/",createGame);

module.exports = router;
