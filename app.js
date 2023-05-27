"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const MAIN = document.querySelector(".main");
const moviesNavbar = document.getElementById("movies-navbar");
const moviesHome = document.querySelector("li");
// Don't touch this function please
const autoRun = async () => {
  const movies = await fetchMovies();
  console.log(movies);
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
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

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie) => {
  MAIN.innerHTML = `
    <div class="row">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};

const tryIt = () => {
  console.log("It is working");
};

const renderHome = () => {
  MAIN.style.setProperty("flex-direction", "row");
  MAIN.style.setProperty("height", "80rem");
  MAIN.innerHTML = `
  <section class="left flex">
  <div class="text-content flex">
    <h2><strong>The stranger</strong></h2>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim,
      omnis magni quidem quis culpa hic praesentium nobis itaque,
      exercitationem atque, quas provident impedit voluptatem ratione
      aperiam ex nostrum autem vel?
    </p>
    <a href="#"><strong>Watch Trailer</strong></a>
  </div>
</section>
<section class="right flex">
  <div class="movies-container grid-3">
    <div class="movie-card">
      <a href="#">
        <img
          class="flex"
          src="assets/images/Super Mario.jpg"
          alt="Super Mario"
        />
      </a>
    </div>
    <div class="movie-card">
      <a href="#">
        <img
          src="assets/images/WhatsApp Image 2023-05-25 at 18.07.47.jpg"
          alt="Super Mario"
        />
      </a>
    </div>
    <div class="movie-card">
      <a href="#">
        <img
          src="assets/images/WhatsApp Image 2023-05-25 at 18.08.15.jpg"
          alt="Super Mario"
        />
      </a>
    </div>
    <div class="movie-card">
      <a href="#">
        <img
          src="assets/images/WhatsApp Image 2023-05-25 at 18.07.47.jpg"
          alt="Super Mario"
        />
      </a>
    </div>
    <div class="movie-card">
      <a href="#">
        <img
          src="assets/images/WhatsApp Image 2023-05-25 at 18.08.15.jpg"
          alt="Super Mario"
        />
      </a>
    </div>
    <div class="movie-card">
      <a href="#">
        <img src="assets/images/Super Mario.jpg" alt="Super Mario" />
      </a>
    </div>
  </div>
</section>
  `;
};
// document.addEventListener("DOMContentLoaded", autoRun);
moviesNavbar.addEventListener("click", autoRun);
moviesHome.addEventListener("click", renderHome);
