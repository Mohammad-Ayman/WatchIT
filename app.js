"use strict";

//Fetch.js
// Global variables
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

let moviesList = [];
let toBeSortedMoviesList = [];
let moviesId = [];

// // Don't touch this function please
const autoRun = async () => {
  const movies = await fetchMovies();
  moviesList = [...movies.results];
  toBeSortedMoviesList = [...movies.results];
  console.log("moviesList:");
  console.log(moviesList);
  getIds();
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (moviesId) => {
  const url = constructUrl(`movie/${moviesId}`);
  const res = await fetch(url);
  return res.json();
};

//filter.js

const searchNavbar = document.getElementById("search");

let moviesPopularity = [];
let moviesReleaseDate = [];
let moviesTopRated = [];

let filteredMovies = [];
let filteredActors = [];

//Function to get Ids of the movies
const getIds = () => {
  moviesList.forEach((movie) => {
    moviesId.push(movie.id);
  });
  console.log(moviesId);
};

function getRandomIndexes(array, count) {
  let indexes = [];

  // Generate `count` random indexes
  while (indexes.length < count) {
    let randomIndex = Math.floor(Math.random() * array.length);

    // Add the random index if it's not already in the array
    if (indexes.indexOf(randomIndex) === -1) {
      indexes.push(randomIndex);
    }
  }

  return indexes;
}

// Function to create a new card
const createCard = (imgPath, title) => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("movie-card");
  newDiv.innerHTML = `
    <img loading="lazy"
      class="flex"
      src="${BACKDROP_BASE_URL + imgPath}"
      alt="${title}"
      />
      `;
  return newDiv;
};

// Functions to Add eventListeners by event delegation
const getCLosestImg = (clickedElement) => {
  console.log(clickedElement.target);
  console.log(clickedElement.target.tagName);
  if (clickedElement.target.tagName === "IMG") {
    let movieToBeViewed = clickedElement.target.closest(` img`);

    const altValue = movieToBeViewed.getAttribute("alt");
    console.log(altValue);
    return altValue;
  } else return;
};

const getActorToBeViewedId = (clickedElement) => {
  const altValue = getCLosestImg(clickedElement);
  const actorID = actors.findIndex((actor) => actor.name === altValue);
  return actorID;
};
const actorsHandler = (clickedElement) => {
  const actorToBeViewedId = getActorToBeViewedId(clickedElement);
  renderSingleActor(actors[actorToBeViewedId]);
};

const getMovieToBeViewedId = (clickedElement) => {
  const altValue = +getCLosestImg(clickedElement);
  const movieID = moviesId.indexOf(altValue);
  return movieID;
};
const moviesHandler = (clickedElement) => {
  const movieToBeViewedId = getMovieToBeViewedId(clickedElement);
  renderSingleMovie(moviesList[movieToBeViewedId]);
};

// Function to search for movies
const searchForMovies = () => {
  const filteredUserInput = searchNavbar.value.trim().toLowerCase();
  filteredMovies = [];
  filteredActors = [];
  moviesList.forEach((movie) => {
    if (movie.original_title.toLowerCase().includes(filteredUserInput))
      filteredMovies.push(movie);
  });
  actors.forEach((actor) => {
    if (actor.name.toLowerCase().includes(filteredUserInput))
      filteredActors.push(actor);
  });
  renderMovies(filteredMovies, `Results containing ${filteredUserInput}`);
  // renderActorsList(filteredActors);
};
const searchBtnHandler = () => {
  console.log(searchNavbar.value.trim());
  searchForMovies();
  console.log(filteredMovies);
  searchNavbar.value = "";
};

// Sorting Arrays
const sortNumberArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => b.popularity - a.popularity
  );
  moviesPopularity = [...sortedArray];
  console.log(moviesPopularity);
  renderMovies(moviesPopularity, "Popular Movies");
};
const sortTopRatedArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => b.vote_average - a.vote_average
  );
  moviesTopRated = [...sortedArray];
  console.log(moviesTopRated);
  renderMovies(moviesTopRated, "Top Rated Movies");
};
const sortDateArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );
  moviesReleaseDate = [...sortedArray];
  console.log(moviesReleaseDate);
  renderMovies(moviesReleaseDate, "Most Recent Movies");
};
//home.js
const renderHome = () => {
  window.addEventListener("resize", () => {
    console.log("I ran... again");
    const mediaQuery = window.matchMedia("(max-width: 749px)");
    if (!mediaQuery.matches) MAIN.style.setProperty("height", "80rem");
    else MAIN.style.setProperty("height", "auto");
  });

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
  <p class="center-text">Welcome to Watch<span>4</span> <br> <span id="hello">Our Recommended Movies For You </span> </p>
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

//moviesList.js
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

//singleMovie.js
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
                  <div><h3>Runtime</h3><p>${movie.runtime} min</p></div>
              </div>
              <div>
                  <div><h3>Language</h3><p>${movie.original_language.toUpperCase()}</p></div>
                  <div><h3>Director</h3><p>Lorem Epsum</p></div>
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
  ulELement.style.setProperty("margin-left", "8vw");
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
  ulELement.style.setProperty("margin-left", "8vw");
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

//actorsList.js
let actorsPictures = [
  "assets/images/actor3.jpg",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
];
let actors = [
  {
    name: "Actor 1",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    //  pictureUrl:  ,
    popularity: "400",
    birthday: "24.09.2000",
    biography: "Some text will be written over here",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [605886, 804150, 882569, 447277, 934433],
  },
  {
    name: "Actor 2",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 786,
    birthday: "15.03.1987",
    biography: "Sed do eiusmod tempor incididunt.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [605886, 804150, 882569, 447277, 934433],
  },
  {
    name: "Actor 3",
    gender: "Female",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 249,
    birthday: "05.11.1992",
    biography: "Lorem ipsum dolor sit amet.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [977223, 493529, 447277, 447365, 700391],
  },
  {
    name: "Actor 4",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 532,
    birthday: "10.07.1985",
    biography: "Consectetur adipiscing elit.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [569094, 447365, 552688, 758323, 1094319],
  },
  {
    name: "Actor 5",
    gender: "Female",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 943,
    birthday: "27.12.1990",
    biography: "Praesent vitae fringilla erat.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [700391, 916224, 605886, 882569, 934433],
  },
  {
    name: "Actor 6",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 620,
    birthday: "18.05.1988",
    biography: "Vestibulum ante ipsum primis.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [493529, 700391, 447277, 804150, 447365],
  },
  {
    name: "Actor 7",
    gender: "Female",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 117,
    birthday: "09.02.1995",
    biography: "Donec id mattis lectus.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [493529, 700391, 447277, 804150, 447365],
  },
  {
    name: "Actor 8",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 847,
    birthday: "21.11.1991",
    biography: "Aenean volutpat justo at.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [493529, 700391, 447277, 804150, 447365],
  },
  {
    name: "Actor 9",
    gender: "Female",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 395,
    birthday: "02.09.1989",
    biography: "Mauris vulputate est vitae.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [649609, 1094319, 493529, 713704, 977223],
  },
  {
    name: "Actor 10",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 502,
    birthday: "14.06.1996",
    biography: "Nam ullamcorper justo ac.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [934433, 569094, 700391, 447365, 447277],
  },
  {
    name: "Actor 11",
    gender: "Female",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 673,
    birthday: "25.03.1993",
    biography: "Vestibulum non metus a.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [916224, 804150, 605886, 385687, 447365],
  },
  {
    name: "Actor 12",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 178,
    birthday: "07.12.1997",
    biography: "Integer condimentum massa a.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [1094319, 977223, 700391, 916224, 447365],
  },
  {
    name: "Actor 13",
    gender: "Female",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 815,
    birthday: "30.09.1986",
    biography: "Fusce rhoncus mauris quis.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [842675, 1094319, 569094, 552688, 758323],
  },
  {
    name: "Actor 14",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 251,
    birthday: "22.08.1994",
    biography: "Pellentesque habitant morbi tristique.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [552688, 758323, 605886, 934433, 700391],
  },
  {
    name: "Actor 15",
    gender: "Female",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 739,
    birthday: "03.05.1999",
    biography: "Nullam a ultrices neque.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [447365, 882569, 804150, 569094, 493529],
  },
  {
    name: "Actor 16",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 426,
    birthday: "15.02.1985",
    biography: "Etiam efficitur magna eu.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [447365, 882569, 804150, 569094, 493529],
  },
  {
    name: "Actor 17",
    gender: "Female",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 567,
    birthday: "26.12.1991",
    biography: "Vivamus in velit eu.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [758323, 447277, 700391, 934433, 916224],
  },
  {
    name: "Actor 18",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 943,
    birthday: "07.10.1998",
    biography: "Suspendisse potenti.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [882569, 842675, 977223, 700391, 447277],
  },
  {
    name: "Actor 19",
    gender: "Female",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 312,
    birthday: "18.07.1993",
    biography: "Phasellus eleifend nulla ac.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [502356, 713704, 447365, 842675, 569094],
  },
  {
    name: "Actor 20",
    gender: "Male",
    pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
    popularity: 678,
    birthday: "29.04.1990",
    biography: "Morbi rutrum massa ut.",
    // listOfMovies: getRandomIndexes(moviesId, 5),
    listOfMovies: [447277, 916224, 804150, 493529, 605886],
  },
];

console.log(actors);

const renderActorsList = (actorsArray) => {
  MAIN.innerHTML = "";
  MAIN.classList.add("actors-main");
  MAIN.style.setProperty("height", "100%");

  const sectionELement = document.createElement("section");
  sectionELement.innerHTML = `
  <h2 class="actors-h2">Actors</h2>
  `;

  const ulELement = document.createElement("ul");
  ulELement.classList.add("actors-ul");

  sectionELement.append(ulELement);

  actorsArray.forEach((actor) => {
    const liELement = document.createElement("li");
    liELement.innerHTML = `
      <img loading="lazy" class="actor-box"
      src=${actor.pictureUrl}  alt="${actor.name}">
      <p class="actors-p">${actor.name}</p>
    `;
    console.log(actor);
    // liELement.addEventListener("click", renderSingleActor(actor));
    ulELement.appendChild(liELement);
  });
  MAIN.appendChild(sectionELement);
  ulELement.addEventListener("click", actorsHandler);
};

//singleActor.js
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
  renderActorRelatedMovies(actor);
};

const renderActorRelatedMovies = (actor) => {
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

//index.js
// Global variables
const logo = document.querySelector(".logo");
const moviesHome = document.querySelector("li");
const moviesNavbar = document.getElementById("movies-navbar");
const actorsNavbar = document.getElementById("actors-navbar");
const searchBtn = document.querySelector(".search-icon");

const filterPopular = document.getElementById("popular-filter");
const filterReleaseDate = document.getElementById("release-date-filter");
const filterTopRated = document.getElementById("top-rated-filter");

// document.addEventListener("DOMContentLoaded", autoRun);
document.addEventListener("DOMContentLoaded", () => autoRun().then(renderHome));
moviesNavbar.addEventListener("click", applyRenderMovies);
moviesHome.addEventListener("click", renderHome);
logo.addEventListener("click", renderHome);
actorsNavbar.addEventListener("click", renderActorsList.bind(null, actors));

searchBtn.addEventListener("click", searchBtnHandler);

filterPopular.addEventListener("click", sortNumberArray);
filterReleaseDate.addEventListener("click", sortDateArray);
filterTopRated.addEventListener("click", sortTopRatedArray);
