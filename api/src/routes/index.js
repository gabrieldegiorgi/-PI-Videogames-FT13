const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const videogamesRoutes = require("./videogames.js");
const genreRoutes = require("./genres.js");

router.use("/videogames", videogamesRoutes);
router.use("/genre", genreRoutes);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
