import { moviesId, moviesList, toBeSortedMoviesList } from "./fetch.js";
import { BACKDROP_BASE_URL } from "./moviesList.js";
import { actors } from "./actorsList.js";

const searchNavbar = document.getElementById("search");

let moviesPopularity = [];
let moviesReleaseDate = [];
let moviesTopRated = [];
let moviesNowPlaying = [];

let filteredMovies = [];

//Function to get Ids of the movies
const getIds = () => {
  moviesList.forEach((movie) => {
    moviesId.push(movie.id);
  });
  console.log(moviesId);
};

// Function to create a new card
const createCard = (imgPath, title) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("movie-card");
  newDiv.innerHTML = `
    <img
      class="flex"
      src="${BACKDROP_BASE_URL + imgPath}"
      alt="${title}"
    />"
    `;
  return newDiv;
};

// Function to search for movies
const searchForMovies = () => {
  const filteredUserInput = searchNavbar.value.trim().toLowerCase();
  filteredMovies = [];
  moviesList.forEach((movie) => {
    if (movie.original_title.toLowerCase().includes(filteredUserInput))
      filteredMovies.push(movie);
  });
  actors.forEach((actor) => {
    if (actor.name.toLowerCase().includes(filteredUserInput))
      filteredMovies.push(actor);
  });
  // filteredMovies = moviesList.filter((movie) => {
  //   return movie.original_title.includes(filteredUserInput);
  // });
};
const searchBtnHandler = () => {
  console.log(searchNavbar.value.trim());
  searchForMovies();
  console.log(filteredMovies);
  searchNavbar.value = "";
  // return searchNavbar.value.trim();
  // searchForMovies();
  // if (filteredMovies.length != 0) createArrayMovies(filteredMovies);
  // // else movieList.innerHTML = "";
};

// Sorting Arrays
const sortNumberArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => b.popularity - a.popularity
  );
  moviesPopularity = [...sortedArray];
  console.log(moviesPopularity);
};
const sortTopRatedArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => b.vote_average - a.vote_average
  );
  moviesTopRated = [...sortedArray];
  console.log(moviesTopRated);
};
const sortStringArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => b.popularity - a.popularity
  );
  moviesPopularity = [...sortedArray];
  // console.log(moviesPopularity);
};
const sortDateArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );
  moviesReleaseDate = [...sortedArray];
  console.log(moviesReleaseDate);
};

// sort handler

// const sortHandler = (sortArray, sortFunction) => {
//   sortFunction();
//   console.log(sortArray);
// };

export {
  createCard,
  getIds,
  searchBtnHandler,
  moviesPopularity,
  moviesTopRated,
  moviesReleaseDate,
  sortNumberArray,
  sortStringArray,
  sortDateArray,
  sortTopRatedArray,
  // sortHandler,
};
