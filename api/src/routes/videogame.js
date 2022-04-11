require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

router.post('/videogame', async (req, res) => {
    

    try {
        const { name, description, releaseDate, rating, genres, platforms } = req.body;
        const newVideogame = await Videogame.create({
            name,
            description,
            platforms,
            rating,
            releaseDate,
        })
        const genre = await Genre.findAll({
            where: { name: genres },
        })
        newVideogame.addGenre(genre)
        res.send('Videogame Successfully Created')
    }
    catch (error){
        console.log(error)
    }

})

module.exports = router;