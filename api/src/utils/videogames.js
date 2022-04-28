require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios").default;
const { Genre, Videogame } = require("../db");

const getApiVideogames = async () => {
  let totalVideogames = [];

  for (let page = 1; page < 6; page++) {
    const gamesFromPage = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
    );
    let { results } = gamesFromPage.data;
    totalVideogames = totalVideogames.concat(results);
    /* const LinksFromPage = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`;
        linksPerPage.push(LinksFromPage) */
  }
  //const TotalVideogames = await Promise.all(linksPerPage.map(link => axios.get(link).data))
  //console.log(TotalVideogames)
  return totalVideogames;
};

const getBbVideogames = async () => {
  const videoGames = [];
  const videogamesDB = await Videogame.findAll({
    attributes: [
      "id",
      "name",
      "rating",
      "background_image",
      "createInDatabase",
    ],
    include: [Genre],
  });
  videogamesDB.forEach((vg) => {
    videoGames.push({
      id: vg.id,
      name: vg.name,
      genres: vg.genres.map((genre) => {
        return {
          id: genre.id,
          name: genre.name,
        };
      }),
      rating: vg.rating,
      background_image: vg.background_image,
      createInDatabase: vg.createInDatabase,
    });
  });
  return videoGames;
};
const getAllVideogames = async () => {
  const videoGames = [];
  const countVideoGames = await Videogame.count();
  const getVideogamesApi = await getApiVideogames();
  if (countVideoGames > 0) {
    const videogamesDB = await Videogame.findAll({
      attributes: [
        "id",
        "name",
        "rating",
        "background_image",
        "createInDatabase",
      ],
      include: [Genre],
    });
    videogamesDB.forEach((vg) => {
      videoGames.push({
        id: vg.id,
        name: vg.name,
        genres: vg.genres.map((genre) => {
          return {
            id: genre.id,
            name: genre.name,
          };
        }),
        rating: vg.rating,
        background_image: vg.background_image,
        createInDatabase: vg.createInDatabase,
      });
    });
  }
  getVideogamesApi.forEach((game) => {
    const { id, name, background_image, genres, rating } = game;
    const genresArray = [];
    for (const genre of genres) {
      //de los generos que me traigo de la descripcion de la api, extraigo los valores para armar un array aparte para mí.
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
      createInDatabase: false,
    });
  });
  return videoGames;
};

const hasQueryName = async (name) => {
  const BDvideogames = await getBbVideogames();
  const DBFilterByName = BDvideogames.filter((v) => v.name.includes(name));
  const game = await axios(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );
  const { results } = game.data;
  if (DBFilterByName.length === 0 && results.length === 0) {
    throw new Error("no games found with that name");
  } else {
    if (DBFilterByName.length > 15) {
      return DBFilterByName.slice(0, 15);
    } else {
      let countGames = DBFilterByName.length;
      results.forEach((result) => {
        const { id, name, background_image, genres, rating } = result;
        if (countGames < 15) {
          DBFilterByName.push({
            id,
            name,
            background_image,
            genres: genres.map((genre) => {
              return { name: genre.name, id: genre.id };
            }),
            rating,
          });
          countGames++;
        }
      });
    }
  }

  return DBFilterByName;
};

module.exports = {
  getApiVideogames,
  getAllVideogames,
  hasQueryName,
};
