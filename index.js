import { renderHome } from "./assets/scripts/home.js";
import { renderActorsList } from "./assets/scripts/actorsList.js";
import { autoRun, moviesList } from "./assets/scripts/fetch.js";
import { applyRenderMovies } from "./assets/scripts/moviesList.js";
import {
  searchBtnHandler,
  sortNumberArray,
  sortTopRatedArray,
  sortDateArray,
} from "./assets/scripts/filter.js";
// Global variables
const moviesHome = document.querySelector("li");
const moviesNavbar = document.getElementById("movies-navbar");
const actorsNavbar = document.getElementById("actors-navbar");
const searchBtn = document.querySelector(".search-icon");

const filterPopular = document.getElementById("popular-filter");
const filterReleaseDate = document.getElementById("release-date-filter");
const filterTopRated = document.getElementById("top-rated-filter");

// document.addEventListener("DOMContentLoaded", autoRun);
document.addEventListener("DOMContentLoaded", () => autoRun().then(renderHome));
moviesNavbar.addEventListener("click", applyRenderMovies);
moviesHome.addEventListener("click", renderHome);
actorsNavbar.addEventListener("click", renderActorsList);

searchBtn.addEventListener("click", searchBtnHandler);

filterPopular.addEventListener("click", sortNumberArray);
filterReleaseDate.addEventListener("click", sortDateArray);
filterTopRated.addEventListener("click", sortTopRatedArray);
