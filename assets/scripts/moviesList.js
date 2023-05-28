import { moviesList } from "./fetch.js";
import { movieDetails } from "./singleMovie.js";
// Global variables
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const MAIN = document.querySelector(".main");

const applyRenderMovies = async () => {
  renderMovies(moviesList);
};

const renderMovies1 = (movies) => {
  MAIN.innerHTML = ""; //empty the content of the main tag
  MAIN.style.setProperty("flex-direction", "column");
  MAIN.style.setProperty("height", "auto");
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.innerHTML = `
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>`;
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    MAIN.appendChild(movieDiv);
  });
};
const renderMovies = (movies) => {
  MAIN.innerHTML = "";
  MAIN.classList.add("actors-main");
  MAIN.style.setProperty("height", "100%");

  const sectionELement = document.createElement("section");
  sectionELement.innerHTML = `
  <h2 class="actors-h2">Movies</h2>
  `;

  const ulELement = document.createElement("ul");
  ulELement.classList.add("actors-ul");

  sectionELement.append(ulELement);

  movies.forEach((movie) => {
    const liELement = document.createElement("li");
    liELement.innerHTML = `
    <img  class="actor-box" 
    src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <p class="actors-p">${movie.title}</p>`;
    liELement.addEventListener("click", () => {
      movieDetails(movie);
    });
    ulELement.appendChild(liELement);
  });
  MAIN.appendChild(sectionELement);
};

export { applyRenderMovies, MAIN, BACKDROP_BASE_URL };
