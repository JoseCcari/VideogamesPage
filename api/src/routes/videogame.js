require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
//const axios = require('axios').default;
//const { Videogame, Genre } = require('../db');
const {createNewVideogame , searchGameDB, searchGameApi} = require('./utils');

router.get('/:idVideogame', async (req, res) => {

    try {
        const { idVideogame } = req.params;
        if (idVideogame.length > 20){

            let resultSearchGameDB = await searchGameDB(idVideogame);
            resultSearchGameDB.length ?
            res.status(200).send(gameId) :
            res.status(404).send('Game not found');
        }
        console.log("busque en la API")
        let resultSearchGameApi = await searchGameApi(idVideogame);
        res.status(200).json(resultSearchGameApi);
        
       
    }
    catch (error){
        next(error);
    }

})


router.post('/', async (req, res) => {
    

    try {
        const { name, background_image, description, releaseDate, rating, genres, platforms} = req.body;
        const resultCreateVideogame = await createNewVideogame(name, background_image, description, releaseDate, rating, genres, platforms)
        res.send(resultCreateVideogame)
    }
    catch (error){
        console.log(error);
    }

})

module.exports = router;