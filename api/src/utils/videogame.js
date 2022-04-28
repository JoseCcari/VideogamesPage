require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios').default;
const { Genre , Videogame} = require('../db');

const createNewVideogame = async ( name,background_image, description, releaseDate, rating, genres, platforms) => {
    const newVideogame = await Videogame.create({
        name,
        background_image,
        description,
        platforms,
        rating,
        releaseDate,
    })
    const genre = await Genre.findAll({
        where: { name: genres },
    })
    newVideogame.addGenre(genre)
    return 'Videogame Successfully Created'
}

const searchGameDB =  async ( idVideogame) => {
    
        let videoGamesFromDB = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

        const matchVideogame = await videoGamesFromDB.
                            filter(videog => videog.id === idVideogame);  
       
        return matchVideogame
}

const searchGameApi =  async ( idVideogame) => {  
    const findVideogameApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`);
    if (findVideogameApi === undefined){
        throw new Error('Game not found')
    }

    const {id, name, background_image, description, released, rating, platforms, genres} = findVideogameApi.data;
    const resultVideoGame = [];
    resultVideoGame.push({
        id,
        name,
        background_image,
        description,
        released,
        rating,
        platforms: platforms.map((p) => ` ${p.platform.name} `),
        genres: genres.map((g) => g.name)
    });
    return resultVideoGame;


}

module.exports = {
    createNewVideogame,
    searchGameDB,
    searchGameApi
}
