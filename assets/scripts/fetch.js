import { getIds } from "./filter.js";
// Global variables
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

let moviesList = [];
let toBeSortedMoviesList = [];
let moviesId = [];

// // Don't touch this function please
const autoRun = async () => {
  const movies = await fetchMovies();
  moviesList = [...movies.results];
  toBeSortedMoviesList = [...movies.results];
  console.log("moviesList:");
  console.log(moviesList);
  getIds();
  // sortNumberArray(moviesList, moviesList.popularity, moviesPopularity);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (moviesId) => {
  const url = constructUrl(`movie/${moviesId}`);
  const res = await fetch(url);
  return res.json();
};

export {
  autoRun,
  fetchMovies,
  fetchMovie,
  moviesList,
  moviesId,
  toBeSortedMoviesList,
};
