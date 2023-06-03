import { MAIN, BACKDROP_BASE_URL } from "./moviesList.js";
import { moviesList } from "./fetch.js";
import { moviesHandler } from "./filter.js";

const renderSingleActor = (actor) => {
  MAIN.style.setProperty("height", "100%");
  MAIN.innerHTML = `
  <div class="actorReview">
      <div id="main-bg" class="flex">
          <div class="info">
              <h3 class="singleActor-h3">${actor.name}</h3>
              <div id="top-info">
                  <div id="side-info">
                      <div class="st-info">
                          <div>
                              <h5 class="singleActor-h5">Gender</h5>
                              <p class="singleActor-p">${actor.gender}</p>
                          </div>
                          <div>
                              <h5 class="singleActor-h5">Popularity</h5>
                              <p class="singleActor-p">${actor.popularity}</p>
                          </div>
                      </div>
                      <div class="nd-info">
                          <div>
                              <h5 class="singleActor-h5">Birthday</h5>
                              <p class="singleActor-p">${actor.birthday}</p>
                          </div>
                          <div>
                              <h5 class="singleActor-h5">Deathday</h5>
                              <p class="singleActor-p">${"Not yet"}</p>
                          </div>
                      </div>
                  </div>
                  <div id="act-picture" style="background-image: url(${
                    actor.pictureUrl
                  });"></div>
                  <div id="bio-info">
                      <h4 class="singleActor-h4">Biography</h4>
                      <p class="singleActor-p">
                      ${actor.biography}
                  </p>
                  </div>
              </div>
          </div>
          <div id="similar">
              <h4 class="singleActor-header">Related Movies</h4>
              <div class="actmovie">
              </div>
          </div>
      </div>
      `;
  renderRelatedMovies(actor);
};

const renderRelatedMovies = (actor) => {
  actor.listOfMovies.forEach((id) => {
    moviesList.forEach((movie) => {
      if (id === movie.id) {
        const actmovie = document.querySelector("#similar .actmovie");

        const ulELement = document.createElement("ul");
        ulELement.classList.add("actors-ul");
        actmovie.append(ulELement);

        const liELement = document.createElement("li");
        liELement.innerHTML = `
         <img  class="actor-box" 
         src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.id} ">
         <p class="actors-p">${movie.title}</p>`;
        ulELement.appendChild(liELement);
        ulELement.addEventListener("click", moviesHandler);
      }
    });
  });
};

export { renderSingleActor };
