import { MAIN, BACKDROP_BASE_URL } from "./moviesList.js";
import { moviesList } from "./fetch.js";
import {
  createCard,
  getRandomIndexes,
  moviesHandler,
  sortTopRatedArray,
} from "./filter.js";
import { moviesTopRated } from "./filter.js";

const checkScreenWidth = () => {
  window.matchMedia("(max-width: 749px)").matches
    ? MAIN.style.setProperty("height", "auto")
    : MAIN.style.setProperty("height", "auto");
};
// const checkScreenWidth = () => {
//   if (!document.fullscreenElement && !document.webkitFullscreenElement) {
//     const initialHeight = MAIN.style.getPropertyValue("height");
//     if (window.matchMedia("(max-width: 749px)").matches) {
//       MAIN.style.setProperty("height", "auto");
//     } else {
//       MAIN.style.setProperty("height", initialHeight);
//     }
//   }
// };

const leftHomeSection = (target, movie) => {
  target.innerHTML = `
  <section class="left flex">
  <div class="text-content flex">
    <h2><strong>${movie.title}</strong></h2>
    <p>
     ${movie.overview}
    </p>
    <a href="#"><strong>Watch Trailer</strong></a>
  </div>
</section>
  `;
  const leftHome = document.querySelector(".left");
  leftHome.style.backgroundImage = `linear-gradient(
    to bottom,
    rgba(26, 235, 50, 0),
    rgba(235, 10, 10, 0.8)  
  ),url(${BACKDROP_BASE_URL + movie.backdrop_path})`;
};
const rightHomeSection = () => {
  const sectionElement = document.createElement("section");
  sectionElement.classList.add("right", "flex");
  sectionElement.innerHTML = `
  <div class="welcome">
  <p class="center-text">Welcome to Watch<span>IT</span> <br> <span id="hello">Our Recommended Movies, For You </span> </p>
  </div>
    <div class="movies-container grid-3">
    </div>
  `;
  renderRecommendedMovies(sectionElement, "movies-container");
  MAIN.appendChild(sectionElement);
  sectionElement
    .querySelector(".movies-container")
    .addEventListener("click", moviesHandler);
};

const renderHome = () => {
  sortTopRatedArray();
  const topRatedMovie = moviesTopRated[0];

  checkScreenWidth();

  window.addEventListener("resize", () => {
    console.log("I ran... again");
    checkScreenWidth();
  });

  leftHomeSection(MAIN, topRatedMovie);
  rightHomeSection();
};

const renderRecommendedMovies = (cardsParent, divClassName) => {
  const recommendedMoviesIndexes = getRandomIndexes(moviesList, 6);
  console.log(recommendedMoviesIndexes);
  recommendedMoviesIndexes.forEach((index) => {
    const newCard = createCard(
      moviesList[index].backdrop_path,
      moviesList[index].id
    );
    cardsParent.querySelector(`.${divClassName}`).appendChild(newCard);
  });
};

export default renderHome;
