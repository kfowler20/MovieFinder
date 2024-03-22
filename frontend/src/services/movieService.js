import axios from "axios";

const BASE_URL = "http://localhost:5001/api/movies";

const getMovies = async (searchQuery) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        query: searchQuery,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

const getMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/${movieId}`);
};

const addToWatchlist = (movieId, title, poster_path) => {
  return axios.post(`${BASE_URL}/watchlist`, { movieId, title, poster_path });
};

const getWatchlist = () => {
  return axios.get(`${BASE_URL}/watchlist`);
};

const updateRating = (movieId, rating) => {
  return axios.put(`${BASE_URL}/rating`, { movieId, rating });
};

const removeFromWatchlist = (movieId) => {
  return axios.delete(`${BASE_URL}/watchlist/${movieId}`);
};

const movieService = {
  getMovies,
  getMovieDetails,
  addToWatchlist,
  getWatchlist,
  updateRating,
  removeFromWatchlist,
};

export default movieService;
