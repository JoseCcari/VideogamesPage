require("dotenv").config();
const { Router } = require("express");
const router = Router();
const { Genre } = require("../db");
const { createGenresFromApi } = require("../utils/genres");
router.get("/", async (req, res) => {
  try {
    const genresDB = await Genre.findAll();
    if (genresDB.length) return res.json(genresDB);
    const genresREADY = await createGenresFromApi();
    res.json(genresREADY);
  } catch (err) {
    return console.log(err);
  }
});

module.exports = router;
