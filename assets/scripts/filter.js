import { moviesList } from "./fetch.js";
import { BACKDROP_BASE_URL } from "./moviesList.js";

const createCard = (imgPath, title) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("movie-card");
  newDiv.innerHTML = `
    <img
      class="flex"
      src="${BACKDROP_BASE_URL + imgPath}"
      alt="${title}"
    />"
    `;
  return newDiv;
};

export { createCard };
