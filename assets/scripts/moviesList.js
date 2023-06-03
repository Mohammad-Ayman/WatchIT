import { moviesList } from "./fetch.js";
import { moviesHandler } from "./filter.js";
// Global variables
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const MAIN = document.querySelector(".main");

const applyRenderMovies = async () => {
  renderMovies(moviesList, "Movies");
};

const renderMovies = (movies, title) => {
  MAIN.innerHTML = "";
  MAIN.classList.add("actors-main");
  MAIN.style.setProperty("height", "100%");

  const sectionELement = document.createElement("section");
  sectionELement.innerHTML = `
  <h2 class="actors-h2">${title}</h2>
  `;

  const ulELement = document.createElement("ul");
  ulELement.classList.add("actors-ul");

  sectionELement.append(ulELement);

  movies.forEach((movie) => {
    const liELement = document.createElement("li");
    liELement.innerHTML = `
    <img loading="lazy" class="actor-box" 
    src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.id}">
        <p class="actors-p">${movie.title}</p>`;

    ulELement.appendChild(liELement);
  });
  MAIN.appendChild(sectionELement);
  ulELement.addEventListener("click", moviesHandler);
  // ulELement.addEventListener("click", () => {
  //   eventListenersHandler("img", "alt");
  // });
};

export { renderMovies, applyRenderMovies, MAIN, BACKDROP_BASE_URL };
