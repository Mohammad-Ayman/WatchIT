import { actors } from "./actorsList.js";
import { MAIN } from "./moviesList.js";
import { moviesList } from "./fetch.js";
import { createCard } from "./filter.js";
import { movieDetails } from "./singleMovie.js";

//<div class="reviewBG"></div>
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
                      <p class="singleActor-p">On a school field trip, Peter Parker (Maguire) is bitten by a genetically modified
                      spider. He wakes up the next morning with incredible powers. After witnessing the death
                      of his uncle (Robertson), Parkers decides to put his new skills to use in order to rid
                      the city of evil, but someone else has other plans. The Green Goblin (Dafoe) sees
                      Spider-Man as a threat and must dispose of him. Even if it means the Goblin has to
                      target Parker's Aunt (Harris) and the girl he secretly pines for (Dunst)
                  </p>
                  </div>
              </div>
          </div>
          <div id="rel-movies">
              <h4 class="singleActor-header">Related Movies</h4>
              <div class="actmovie">
              </div>
          </div>
      </div>
      `;
  renderRelatedMovies(actor);
};

// for (let i = 0; i < actors.listOfMovies.length; i++) {
const renderRelatedMovies = (actor) => {
  actor.listOfMovies.forEach((id) => {
    moviesList.forEach((movie) => {
      if (id === movie.id) {
        console.log("Found " + id);
        const sectionELement = document.createElement("section");
        const newCard = createCard(movie.backdrop_path, movie.id);
        newCard.addEventListener("click", () => {
          movieDetails(movie);
        });
        sectionELement.appendChild(newCard);
        MAIN.querySelector(".actmovie").appendChild(sectionELement);
      }
    });
  });
};

export { renderSingleActor };
