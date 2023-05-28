import { MAIN, BACKDROP_BASE_URL } from "./moviesList.js";
import { moviesList } from "./fetch.js";
import { createCard } from "./filter.js";
import { movieDetails } from "./singleMovie.js";

const renderHome = () => {
  MAIN.style.setProperty("height", "80rem");
  MAIN.innerHTML = `
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
  `;

  const sectionElement = document.createElement("section");
  sectionElement.classList.add("right", "flex");
  sectionElement.innerHTML = `
  <div class="welcome">
  <p class="center-text">Welcome to Watch4Free <br> This our recommended movies for you </p>
  </div>
    <div class="movies-container grid-3">
    </div>
  `;
  for (let i = 0; i < 6 && i < moviesList.length; i++) {
    const newCard = createCard(moviesList[i].backdrop_path, moviesList[i].id);
    sectionElement.querySelector(".movies-container").appendChild(newCard);
    newCard.addEventListener("click", () => {
      movieDetails(moviesList[i]);
    });
  }
  MAIN.appendChild(sectionElement);
};

export { renderHome };
