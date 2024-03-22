import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import WatchList from "./components/WatchList";

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-film"></i> Movie Finder
          </Link>
          <Link to="/watchlist" className="btn btn-secondary">
            View Watchlist
          </Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<WatchList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
