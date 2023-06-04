import { moviesId, moviesList, toBeSortedMoviesList } from "./fetch.js";
import { BACKDROP_BASE_URL } from "./moviesList.js";
import { actors } from "./actorsList.js";
import { renderSingleActor } from "./singleActor.js";
import { renderMovies } from "./moviesList.js";
import { renderSingleMovie } from "./singleMovie.js";

const searchNavbar = document.getElementById("search");

let moviesPopularity = [];
let moviesReleaseDate = [];
let moviesTopRated = [];

let filteredMovies = [];
let filteredActors = [];

//Function to get Ids of the movies
const getIds = () => {
  moviesList.forEach((movie) => {
    moviesId.push(movie.id);
  });
  console.log(moviesId);
};

function getRandomIndexes(array, count) {
  let indexes = [];

  // Generate `count` random indexes
  while (indexes.length < count) {
    let randomIndex = Math.floor(Math.random() * array.length);

    // Add the random index if it's not already in the array
    if (indexes.indexOf(randomIndex) === -1) {
      indexes.push(randomIndex);
    }
  }

  return indexes;
}

// Function to create a new card
const createCard = (imgPath, title) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("movie-card");
  newDiv.innerHTML = `
    <img loading="lazy"
      class="flex"
      src="${BACKDROP_BASE_URL + imgPath}"
      alt="${title}"
      />
      `;
  return newDiv;
};

// Functions to Add eventListeners by event delegation
const getCLosestImg = (clickedElement) => {
  console.log(clickedElement.target);
  console.log(clickedElement.target.tagName);
  if (clickedElement.target.tagName === "IMG") {
    let movieToBeViewed = clickedElement.target.closest(` img`);

    const altValue = movieToBeViewed.getAttribute("alt");
    console.log(altValue);
    return altValue;
  } else return;
};

const getActorToBeViewedId = (clickedElement) => {
  const altValue = getCLosestImg(clickedElement);
  const actorID = actors.findIndex((actor) => actor.name === altValue);
  return actorID;
};
const actorsHandler = (clickedElement) => {
  const actorToBeViewedId = getActorToBeViewedId(clickedElement);
  renderSingleActor(actors[actorToBeViewedId]);
};

const getMovieToBeViewedId = (clickedElement) => {
  const altValue = +getCLosestImg(clickedElement);
  const movieID = moviesId.indexOf(altValue);
  return movieID;
};
const moviesHandler = (clickedElement) => {
  const movieToBeViewedId = getMovieToBeViewedId(clickedElement);
  renderSingleMovie(moviesList[movieToBeViewedId]);
};

// Function to search for movies
const searchForMovies = () => {
  const filteredUserInput = searchNavbar.value.trim().toLowerCase();
  filteredMovies = [];
  filteredActors = [];
  moviesList.forEach((movie) => {
    if (movie.original_title.toLowerCase().includes(filteredUserInput))
      filteredMovies.push(movie);
  });
  actors.forEach((actor) => {
    if (actor.name.toLowerCase().includes(filteredUserInput))
      filteredActors.push(actor);
  });
  renderMovies(filteredMovies, `Results containing ${filteredUserInput}`);
  // renderActorsList(filteredActors);
};
const searchBtnHandler = () => {
  console.log(searchNavbar.value.trim());
  searchForMovies();
  console.log(filteredMovies);
  searchNavbar.value = "";
};

// Sorting Arrays
const sortNumberArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => b.popularity - a.popularity
  );
  moviesPopularity = [...sortedArray];
  console.log(moviesPopularity);
  renderMovies(moviesPopularity, "Popular Movies");
};
const sortTopRatedArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => b.vote_average - a.vote_average
  );
  moviesTopRated = [...sortedArray];
  console.log(moviesTopRated);
  renderMovies(moviesTopRated, "Top Rated Movies");
};
const sortDateArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );
  moviesReleaseDate = [...sortedArray];
  console.log(moviesReleaseDate);
  renderMovies(moviesReleaseDate, "Most Recent Movies");
};

export {
  createCard,
  getIds,
  searchBtnHandler,
  moviesPopularity,
  moviesTopRated,
  moviesReleaseDate,
  sortNumberArray,
  sortDateArray,
  sortTopRatedArray,
  getRandomIndexes,
  moviesHandler,
  actorsHandler,
};
