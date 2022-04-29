require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios").default;
const { Genre } = require("../db");

const createGenresFromApi = async () => {
  const genresAPI = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  const genresResult = genresAPI.data.results;

  genresResult.forEach(async (g) => {
    await Genre.findOrCreate({
      where: {
        //id: g.id,
        name: g.name,
      },
    });
  });
  const genresREADY = genresResult.map((game) => {
    return {
      id: game.id,
      name: game.name,
    };
  });
  return genresREADY;
};

module.exports = {
  createGenresFromApi,
};
