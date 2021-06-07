const { Router } = require("express");
const { getGenres } = require("../controllers/genres.js");

const router = Router();
router.get("/", getGenres);

module.exports = router;
