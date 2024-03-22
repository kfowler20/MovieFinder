const Movie = require("../models/Movie");
const axios = require("axios");

const API_KEY = "3d3d8e65f14a1d80db663cfa6c18ea47";
const BASE_URL = "https://api.themoviedb.org/3";

exports.getMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: req.query.query,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    const { movieId, title, poster_path } = req.body;

    const existingMovie = await Movie.findOne({ movieId });

    if (existingMovie) {
      return res
        .status(400)
        .json({ error: "Movie already exists in the watchlist" });
    }

    const movie = new Movie({ movieId, title, poster_path });
    await movie.save();

    res.status(201).json(movie);
  } catch (error) {
    console.error("Error adding movie to watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getWatchlist = async (req, res) => {
  try {
    const watchlist = await Movie.find().select("movieId title poster_path");
    res.json(watchlist);
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { movieId, rating } = req.body;
    const movie = await Movie.findOneAndUpdate(
      { movieId },
      { rating },
      { new: true }
    );
    res.json(movie);
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    await Movie.findOneAndDelete({ movieId });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error removing movie from watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
