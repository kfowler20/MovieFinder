import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import movieService from "../services/movieService";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchMovies = useCallback(async () => {
    try {
      const response = await movieService.getMovies(searchQuery);
      setMovies(response.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }, [searchQuery]);
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddToWatchlist = async (movie) => {
    try {
      await movieService.addToWatchlist(
        movie.id,
        movie.title,
        movie.poster_path
      );
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
    }
  };
  const truncateDescription = (description) => {
    const maxLength = 100;
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="container">
      <h1>Movie List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <button onClick={fetchMovies} className="btn search-btn">
          Search
        </button>
      </div>
      {movies.length === 0 ? (
        searchQuery ? (
          <p>No movies found. Try searching for something else.</p>
        ) : (
          <p>Start exploring movies by entering a search term.</p>
        )
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  {truncateDescription(movie.overview)}
                </p>
                <div className="btn-container">
                  <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                  <button
                    onClick={() => handleAddToWatchlist(movie)}
                    className="btn btn-secondary"
                  >
                    Add to Watchlist
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

export default MovieList;
