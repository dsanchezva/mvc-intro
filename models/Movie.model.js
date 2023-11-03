// We can create a movie schema & model here

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: String,
  director: String,
  duration: String,
  genre: [String],
  rate: String,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
