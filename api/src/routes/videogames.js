const { Router } = require("express");
const {getGames} = require("../controllers/videogames.js")

const router = Router();
router.get("/", getGames);




module.exports = router;
