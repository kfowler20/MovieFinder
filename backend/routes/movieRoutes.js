const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/", movieController.getMovies);
router.post("/watchlist", movieController.addToWatchlist);
router.get("/watchlist", movieController.getWatchlist);
router.put("/rating", movieController.updateRating);
router.delete("/watchlist/:movieId", movieController.removeFromWatchlist);
router.get("/:id", movieController.getMovieById);
module.exports = router;
