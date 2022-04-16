require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const {createNewVideogame , searchGameDB, searchGameApi} = require('../utils/videogame')

router.get('/:idVideogame', async (req, res) => {

    try {
        const { idVideogame } = req.params;
        if (idVideogame.length > 20){

            let resultSearchGameDB = await searchGameDB(idVideogame);
            resultSearchGameDB.length ?
            res.status(200).send(gameId) :
            res.status(404).send('Game not found');
        }
        let resultSearchGameApi = await searchGameApi(idVideogame);
        res.status(200).json(resultSearchGameApi);
        
       
    }
    catch (error){
        next(error);
    }

})


router.post('/', async (req, res, next ) => {
    

    try {
        const { name, background_image, description, releaseDate, rating, genres, platforms} = req.body;
        const resultCreateVideogame = await createNewVideogame(name, background_image, description, releaseDate, rating, genres, platforms)
        res.send(resultCreateVideogame)
    }
    catch (error){
        next(error);
    }

})

module.exports = router;