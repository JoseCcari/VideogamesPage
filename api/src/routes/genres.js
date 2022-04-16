require('dotenv').config();
//const { API_KEY } = process.env;
const { Router } = require('express');
const router = Router();
//const axios = require('axios').default;
const { Genre } = require('../db');
const {createGenresFromApi} = require('../utils/genres')
router.get('/', async (req, res) => {
    try {
        const genresDB = await Genre.findAll();
        if (genresDB.length) 
        return res.json(genresDB)
        const genresREADY = await createGenresFromApi()
        res.json(genresREADY) 
        
    } catch (err) {
        return console.log(err)
    }
})
router.post("/", async (req, res, next) => {
    const {name} = req.body;
  
    try {
      const newGenre = await Genre.create({
        name
      });
      res.status(201).send(newGenre);
  
    } catch (error) {
      next(error);
    };
  
  });

module.exports = router;