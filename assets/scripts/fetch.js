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
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}//${path}?api_key=949427db6a46ecc017077039c6981bb4&with_genres=16&page=20`;
  // return `${TMDB_BASE_URL}/${path}?api_key=${atob(
  //   "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  // )}`;
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`discover/movie`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (moviesId) => {
  const url = constructUrl(`movie/${moviesId}`);
  const res = await fetch(url);
  console.log("fetched movie" + res);
  console.log(res.json());
  return res.json();
};
const fetchTrailers = async (movie_id) => {
  const url = constructUrl(`movie/${movie_id}/videos`);
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.results);
  return data;
};
export {
  autoRun,
  fetchMovies,
  fetchMovie,
  fetchTrailers,
  moviesList,
  moviesId,
  toBeSortedMoviesList,
};
