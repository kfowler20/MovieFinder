import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import movieService from "../services/movieService";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const { id } = useParams();

  const fetchMovieDetails = useCallback(async () => {
    try {
      const response = await movieService.getMovieDetails(id);
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleRatingSubmit = async () => {
    try {
      await movieService.updateRating(movie.id, rating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Link to="/" className="btn back-btn">
        Back to Search
      </Link>
      <div className="movie-details">
        <div className="movie-info">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-info-text">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <div className="rating-container">
              <h3>Rating</h3>
              <select
                value={rating}
                onChange={handleRatingChange}
                className="rating-select"
              >
                {[...Array(11)].map((_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
              <button onClick={handleRatingSubmit} className="btn rating-btn">
                Submit Rating
              </button>
            </div>
          </div>
        </div>
        <p>Release Date: {movie.release_date}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
