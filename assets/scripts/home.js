import { MAIN } from "./moviesList.js";
import { moviesList } from "./fetch.js";
import { createCard, getRandomIndexes, moviesHandler } from "./filter.js";

const checkScreenWidth = () => {
  window.matchMedia("(max-width: 749px)").matches
    ? MAIN.style.setProperty("height", "auto")
    : MAIN.style.setProperty("height", "80rem");
};
const renderHome = () => {
  checkScreenWidth(),
    window.addEventListener("resize", () => {
      console.log("I ran... again"), checkScreenWidth();
    }),
    (MAIN.innerHTML = `
  <section class="left flex">
  <div class="text-content flex">
    <h2><strong>Spiderman</strong></h2>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim,
      omnis magni quidem quis culpa hic praesentium nobis itaque,
      exercitationem atque, quas provident impedit voluptatem ratione
      aperiam ex nostrum autem vel?
    </p>
    <a href="#"><strong>Watch Trailer</strong></a>
  </div>
</section>
  `);

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
