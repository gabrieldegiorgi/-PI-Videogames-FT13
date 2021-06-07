const { Router } = require("express");

const router = Router();
router.get("/", (req, res, next) => {
    console.log("Probando ruta Genre")
});

module.exports = router;
