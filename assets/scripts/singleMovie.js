import { fetchMovie, moviesList } from "/assets/scripts/fetch.js";
import { MAIN, BACKDROP_BASE_URL } from "./moviesList.js";
import { actors } from "./actorsList.js";
import { moviesHandler, getRandomIndexes, actorsHandler } from "./filter.js";

const renderSingleMovie = (movie) => {
  MAIN.style.setProperty("height", "auto");
  MAIN.innerHTML = `
  <div id="main-bg"> 
  <div class="info">
      <h1 id="title-name">${movie.title}</h1>
      <div>
          <div id="side-info">
              <div>
                  <div><h3>Release Date</h3><p>${movie.release_date}</p></div>
                  <div><h3>Popularity</h3><p>${movie.popularity}</p></div>
              </div>
              <div>
                  <div><h3>Language</h3><p>${movie.original_language.toUpperCase()}</p></div>
                  <div><h3>Rate</h3><p>${movie.vote_average}</p></div>
                  </div>
          </div>
          <div id="spidy">
          </div>
          <div id="trailer-container"> 
              <h1>Trailer</h1>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/F478PvRt74Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
      </div>
  </div> 
  <div class="info">
      <h1 id="over">Overview</h1>
      <p>
      ${movie.overview} ${movie.overview}
      </p>
  </div>
  <div id="actors">
      <h1 class="header">Actors</h1>
      <div class="actmovie">
      </div>
  </div>
  <div id="similar">
      <h1 class="header">Similar Movies</h1>
      <div class="actmovie">
      </div>
  </div>
  <div id="production">
      <h1 class="header">Production Companies</h1>
      <div></div>
      </div>
      </div>
      `;
  const backgroundImage = document.getElementById("spidy");
  backgroundImage.style.setProperty(
    "background-image",
    "url(" + BACKDROP_BASE_URL + movie.backdrop_path + ")"
  );

  renderRelatedActors(movie);
  renderRelatedMovies(movie);
};

const renderRelatedMovies = (movies) => {
  const actmovie = document.querySelector("#similar .actmovie");

  const ulELement = document.createElement("ul");
  ulELement.classList.add("actors-ul");
  // ulELement.style.setProperty("margin-left", "8vw");
  actmovie.append(ulELement);

  const recommendedMoviesIndexes = getRandomIndexes(moviesList, 6);
  console.log(recommendedMoviesIndexes);
  recommendedMoviesIndexes.forEach((index) => {
    const liELement = document.createElement("li");
    liELement.innerHTML = `
    <img  class="actor-box" 
    src="${BACKDROP_BASE_URL + moviesList[index].backdrop_path}" alt="${
      moviesList[index].id
    } ">
        <p class="actors-p">${moviesList[index].title}</p>`;
    ulELement.appendChild(liELement);
  });
  ulELement.addEventListener("click", moviesHandler);
};

const renderRelatedActors = (movie) => {
  const actmovie = document.querySelector("#actors .actmovie");

  const ulELement = document.createElement("ul");
  ulELement.classList.add("actors-ul");
  // ulELement.style.setProperty("margin-left", "8vw");
  actmovie.append(ulELement);

  actors.forEach((actor) => {
    actor.listOfMovies.forEach((id) => {
      if (id === movie.id) {
        const liELement = document.createElement("li");
        liELement.innerHTML = `
    <img  class="actor-box" 
    src="${actor.pictureUrl}" alt="${actor.name}">
        <p class="actors-p">${actor.name}</p>`;
        ulELement.appendChild(liELement);
      }
    });
  });
  ulELement.addEventListener("click", actorsHandler);
};

export { renderSingleMovie };
