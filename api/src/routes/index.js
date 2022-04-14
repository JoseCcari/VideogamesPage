const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const videogames = require('./videogames')
const videogame = require('./videogame')
const genres = require('./genres')

router.use('/videogames', videogames);
router.use('/videogame', videogame);
router.use('/genres', genres);

module.exports = router;
