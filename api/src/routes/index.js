const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const videogames = require('./videogames')
const videogame = require('./videogame')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', videogame);


module.exports = router;
