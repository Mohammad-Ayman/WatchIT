import renderHome from "./assets/scripts/home.js";
import { renderActorsList, actors } from "./assets/scripts/actorsList.js";
import { autoRun, moviesList } from "./assets/scripts/fetch.js";
import { applyRenderMovies } from "./assets/scripts/moviesList.js";
import {
  searchBtnHandler,
  sortNumberArray,
  sortTopRatedArray,
  sortDateArray,
} from "./assets/scripts/filter.js";
// Global variables
const logo = document.querySelector(".logo");
const moviesHome = document.querySelector("li");
const moviesNavbar = document.getElementById("movies-navbar");
const actorsNavbar = document.getElementById("actors-navbar");
const searchBtn = document.querySelector(".search-icon");

const filterPopular = document.getElementById("popular-filter");
const filterReleaseDate = document.getElementById("release-date-filter");
const filterTopRated = document.getElementById("top-rated-filter");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown");

// document.addEventListener("DOMContentLoaded", autoRun);
document.addEventListener("DOMContentLoaded", () => autoRun().then(renderHome));
moviesNavbar.addEventListener("click", applyRenderMovies);
moviesHome.addEventListener("click", renderHome);
logo.addEventListener("click", renderHome);
actorsNavbar.addEventListener("click", renderActorsList.bind(null, actors));

searchBtn.addEventListener("click", searchBtnHandler);

filterPopular.addEventListener("click", sortNumberArray);
filterReleaseDate.addEventListener("click", sortDateArray);
filterTopRated.addEventListener("click", sortTopRatedArray);
dropdownToggle.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});
// const fetchTrailers = async (movie_id) => {
//   // const url = constructUrl(`movie/${movie_id}/videos`);
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=949427db6a46ecc017077039c6981bb4&with_genres=16&page=20`
//   );
//   const data = await res.json();
//   console.log(data);
//   return data;
// };
// fetchTrailers(459003);
