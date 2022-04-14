require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios').default;
const { Genre , Videogame} = require('../db');

const createGenresFromApi = async() => {
    const genresAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genresResult = genresAPI.data.results; 


    genresResult.forEach(async g => {
        await Genre.findOrCreate({
            where: {
                id: g.id,
                name: g.name
            }
        })
    })
    const genresREADY = genresResult.map(game => {
        return{
            id: game.id,
            name: game.name
        }
    });
    return genresREADY
}

const getApiVideogames = async () => {
    let totalVideogames = [];
    
    for(let page = 1 ; page < 6 ; page++){
        const gamesFromPage = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
        let { results } = gamesFromPage.data;
        totalVideogames = totalVideogames.concat(results);
    } 
    return totalVideogames
}

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

const getAllVideogames =  async () => {
    const videoGames = [];
    const countVideoGames = await Videogame.count();
    const getVideogamesApi = await getApiVideogames();
    if (countVideoGames > 0){
      const videogamesDB = await VideoGame.findAll(
        {
          attributes: ["id","name", "rating" ,"background_image"],
          include: [Genre]
        }
      ) 
      videogamesDB.forEach ( (vg) => {
        videoGames.push({
          id: vg.id,
          name: vg.name,
          genres: vg.genres.map((genre)=>{
            return {
              id:genre.id,
              name: genre.name
            }
          }),
          rating: vg.rating,
          background_image: vg.background_image
        })
      })

    } 
    getVideogamesApi.forEach( (game) => {
      const { id, name, background_image, genres, rating } = game;
      const genresArray = [];
      for (const genre of genres) { //de los generos que me traigo de la descripcion de la api, extraigo los valores para armar un array aparte para mí.
        const { name, id } = genre;
        genresArray.push({
            id,
            name,
        });
      }
      videoGames.push({
        id,
        name,
        background_image,
        genres: genresArray,
        rating,
      });
    })
    return videoGames
  
}

const hasQueryName = async (name) => {
  const nameQuery = name.toLocaleLowerCase(); 
  encodeURI(nameQuery); 
  const arrayGames = [];
  const game = await axios(`https://api.rawg.io/api/games?search=${nameQuery}&key=${API_KEY}`);
  const { results } = game.data;
  if (results.length === 0) { 
    throw new Error('no games found with that name')
  }
  let countGames = 0;
  results.forEach( (result) => {
    const { id, name, background_image, genres, rating } = result;
    if (countGames<15) {
      arrayGames.push({
        id,
        name,
        background_image,
        genres: genres.map((genre) => {
            return { name: genre.name, id: genre.id };
        }),
        rating
      });
      countGames++;
    }

  })

  return arrayGames

}

module.exports = {
    createNewVideogame,
    getApiVideogames,
    createGenresFromApi,
    searchGameDB,
    searchGameApi,
    getAllVideogames,
    hasQueryName
}