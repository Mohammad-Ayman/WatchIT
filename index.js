import { renderHome } from "./assets/scripts/home.js";
import { renderActorsList } from "./assets/scripts/actorsList.js";
import { autoRun, moviesList } from "./assets/scripts/fetch.js";
import { applyRenderMovies } from "./assets/scripts/moviesList.js";
// Global variables
const moviesHome = document.querySelector("li");
const moviesNavbar = document.getElementById("movies-navbar");
const actorsNavbar = document.getElementById("actors-navbar");

// document.addEventListener("DOMContentLoaded", autoRun);
document.addEventListener("DOMContentLoaded", () => autoRun().then(renderHome));
moviesNavbar.addEventListener("click", applyRenderMovies);
moviesHome.addEventListener("click", renderHome);
actorsNavbar.addEventListener("click", renderActorsList);
