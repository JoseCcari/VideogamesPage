require('dotenv').config();
const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

const {getAllVideogames, hasQueryName} = require ('./utils')


router.get('/', async (req, res) => {

    const {name} = req.query;
    try {
        if (name){
            const resultQueryname= await hasQueryName(name)
            return res.status(200).json(resultQueryname);
        }
        const resultVideogames = await getAllVideogames();
        res.status(200).json(resultVideogames);
        
    }
    catch (error){
        console.log(error);
    }
})


module.exports = router;