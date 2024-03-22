import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieService from "../services/movieService";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await movieService.getWatchlist();
      setWatchlist(response.data);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await movieService.removeFromWatchlist(movieId);
      fetchWatchlist();
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

  return (
    <div className="container">
      <Link to="/" className="btn back-btn">
        Back to Search
      </Link>
      <h1>Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>Your watchlist is empty. Start exploring movies!</p>
      ) : (
        <div className="movie-list">
          {watchlist.map((movie) => (
            <div key={movie.movieId} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <div className="btn-container">
                  <Link
                    to={`/movie/${movie.movieId}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleRemoveFromWatchlist(movie.movieId)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
