"use strict";
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
  // sortNumberArray(moviesList, moviesList.popularity, moviesPopularity);
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
let moviesNowPlaying = [];

let filteredMovies = [];

//Function to get Ids of the movies
const getIds = () => {
  moviesList.forEach((movie) => {
    moviesId.push(movie.id);
  });
  console.log(moviesId);
};

// Function to create a new card
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

// Function to search for movies
const searchForMovies = () => {
  const filteredUserInput = searchNavbar.value.trim().toLowerCase();
  filteredMovies = [];
  moviesList.forEach((movie) => {
    if (movie.original_title.toLowerCase().includes(filteredUserInput))
      filteredMovies.push(movie);
  });
  actors.forEach((actor) => {
    if (actor.name.toLowerCase().includes(filteredUserInput))
      filteredMovies.push(actor);
  });
  // filteredMovies = moviesList.filter((movie) => {
  //   return movie.original_title.includes(filteredUserInput);
  // });
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
};
const sortTopRatedArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => b.vote_average - a.vote_average
  );
  moviesTopRated = [...sortedArray];
  console.log(moviesTopRated);
};
// const sortStringArray = () => {
//   const sortedArray = toBeSortedMoviesList.sort(
//     (a, b) => b.popularity - a.popularity
//   );
//   moviesPopularity = [...sortedArray];
//   // console.log(moviesPopularity);
// };
const sortDateArray = () => {
  const sortedArray = toBeSortedMoviesList.sort(
    (a, b) => new Date(a.release_date) - new Date(b.release_date)
  );
  moviesReleaseDate = [...sortedArray];
  console.log(moviesReleaseDate);
};

//home.js

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

//movies.js
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const MAIN = document.querySelector(".main");

const applyRenderMovies = async () => {
  renderMovies(moviesList);
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

//singleMovie.js
// You may need to add to this function, definitely don't delete it.
// const movieDetails = async (movie) => {
//   const movieRes = await fetchMovie(movie.id);
//   renderMovie(movieRes);
// };

// // You'll need to play with this function in order to add features and enhance the style.
// const renderMovie = (movie) => {
//   MAIN.innerHTML = `
//     <div class="row">
//         <div class="col-md-4">
//              <img id="movie-backdrop" src=${
//                BACKDROP_BASE_URL + movie.backdrop_path
//              }>
//         </div>
//         <div class="col-md-8">
//             <h2 id="movie-title">${movie.title}</h2>
//             <p id="movie-release-date"><b>Release Date:</b> ${
//               movie.release_date
//             }</p>
//             <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
//             <h3>Overview:</h3>
//             <p id="movie-overview">${movie.overview}</p>
//         </div>
//             <h3>Actors:</h3>
//             <ul id="actors" class="list-unstyled"></ul>
//     </div>`;
// };
//actorsList.js
let actors = [
  {
    name: "Mohamed",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: "400",
    birthday: "24.09.2000",
    biography: "Some text will be written over here",
    listOfMovies: [804150, 493529, 700391, 713704, 552688],
  },
  {
    name: "Actor 2",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 786,
    birthday: "15.03.1987",
    biography: "Sed do eiusmod tempor incididunt.",
    listOfMovies: [605886, 804150, 882569, 447277, 934433],
  },
  {
    name: "Actor 3",
    gender: "Female",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: 249,
    birthday: "05.11.1992",
    biography: "Lorem ipsum dolor sit amet.",
    listOfMovies: [977223, 493529, 447277, 447365, 700391],
  },
  {
    name: "Actor 4",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 532,
    birthday: "10.07.1985",
    biography: "Consectetur adipiscing elit.",
    listOfMovies: [569094, 447365, 552688, 758323, 1094319],
  },
  {
    name: "Actor 5",
    gender: "Female",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: 943,
    birthday: "27.12.1990",
    biography: "Praesent vitae fringilla erat.",
    listOfMovies: [700391, 916224, 605886, 882569, 934433],
  },
  {
    name: "Actor 6",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 620,
    birthday: "18.05.1988",
    biography: "Vestibulum ante ipsum primis.",
    listOfMovies: [493529, 700391, 447277, 804150, 447365],
  },
  {
    name: "Actor 7",
    gender: "Female",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: 117,
    birthday: "09.02.1995",
    biography: "Donec id mattis lectus.",
    listOfMovies: [493529, 700391, 447277, 804150, 447365],
  },
  {
    name: "Actor 8",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 847,
    birthday: "21.11.1991",
    biography: "Aenean volutpat justo at.",
    listOfMovies: [493529, 700391, 447277, 804150, 447365],
  },
  {
    name: "Actor 9",
    gender: "Female",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: 395,
    birthday: "02.09.1989",
    biography: "Mauris vulputate est vitae.",
    listOfMovies: [649609, 1094319, 493529, 713704, 977223],
  },
  {
    name: "Actor 10",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 502,
    birthday: "14.06.1996",
    biography: "Nam ullamcorper justo ac.",
    listOfMovies: [934433, 569094, 700391, 447365, 447277],
  },
  {
    name: "Actor 11",
    gender: "Female",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: 673,
    birthday: "25.03.1993",
    biography: "Vestibulum non metus a.",
    listOfMovies: [916224, 804150, 605886, 385687, 447365],
  },
  {
    name: "Actor 12",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 178,
    birthday: "07.12.1997",
    biography: "Integer condimentum massa a.",
    listOfMovies: [1094319, 977223, 700391, 916224, 447365],
  },
  {
    name: "Actor 13",
    gender: "Female",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: 815,
    birthday: "30.09.1986",
    biography: "Fusce rhoncus mauris quis.",
    listOfMovies: [842675, 1094319, 569094, 552688, 758323],
  },
  {
    name: "Actor 14",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 251,
    birthday: "22.08.1994",
    biography: "Pellentesque habitant morbi tristique.",
    listOfMovies: [552688, 758323, 605886, 934433, 700391],
  },
  {
    name: "Actor 15",
    gender: "Female",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: 739,
    birthday: "03.05.1999",
    biography: "Nullam a ultrices neque.",
    listOfMovies: [447365, 882569, 804150, 569094, 493529],
  },
  {
    name: "Actor 16",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 426,
    birthday: "15.02.1985",
    biography: "Etiam efficitur magna eu.",
    listOfMovies: [447365, 882569, 804150, 569094, 493529],
  },
  {
    name: "Actor 17",
    gender: "Female",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: 567,
    birthday: "26.12.1991",
    biography: "Vivamus in velit eu.",
    listOfMovies: [758323, 447277, 700391, 934433, 916224],
  },
  {
    name: "Actor 18",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 943,
    birthday: "07.10.1998",
    biography: "Suspendisse potenti.",
    listOfMovies: [882569, 842675, 977223, 700391, 447277],
  },
  {
    name: "Actor 19",
    gender: "Female",
    pictureUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popularity: 312,
    birthday: "18.07.1993",
    biography: "Phasellus eleifend nulla ac.",
    listOfMovies: [502356, 713704, 447365, 842675, 569094],
  },
  {
    name: "Actor 20",
    gender: "Male",
    pictureUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 678,
    birthday: "29.04.1990",
    biography: "Morbi rutrum massa ut.",
    listOfMovies: [447277, 916224, 804150, 493529, 605886],
  },
];

console.log(actors);

const renderActorsList = () => {
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

  actors.forEach((actor) => {
    const liELement = document.createElement("li");
    liELement.innerHTML = `
      <img class="actor-box"
      src=${actor.pictureUrl}></img>
      <p class="actors-p">${actor.name}</p>
    `;
    liELement.addEventListener("click", () => {
      renderSingleActor(actor);
    });
    console.log(actor);
    // liELement.addEventListener("click", renderSingleActor(actor));
    ulELement.appendChild(liELement);
  });
  MAIN.appendChild(sectionELement);
};
//singleActor.js
// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);
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

//index.js

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
actorsNavbar.addEventListener("click", renderActorsList);

searchBtn.addEventListener("click", searchBtnHandler);

filterPopular.addEventListener("click", sortNumberArray);
filterReleaseDate.addEventListener("click", sortDateArray);
filterTopRated.addEventListener("click", sortTopRatedArray);

// const TMDB_BASE_URL = "https://api.themoviedb.org/3";
// const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
// const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
// const CONTAINER = document.querySelector(".container");
// const MAIN = document.querySelector(".main");
// const moviesNavbar = document.getElementById("movies-navbar");
// const moviesHome = document.querySelector("li");
// // Don't touch this function please
// const autoRun = async () => {
//   const movies = await fetchMovies();
//   console.log(movies);
//   renderMovies(movies.results);
// };

// // Don't touch this function please
// const constructUrl = (path) => {
//   return `${TMDB_BASE_URL}/${path}?api_key=${atob(
//     "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
//   )}`;
// };

// // You may need to add to this function, definitely don't delete it.
// const movieDetails = async (movie) => {
//   const movieRes = await fetchMovie(movie.id);
//   renderMovie(movieRes);
// };

// // This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
// const fetchMovies = async () => {
//   const url = constructUrl(`movie/now_playing`);
//   const res = await fetch(url);
//   return res.json();
// };

// // Don't touch this function please. This function is to fetch one movie.
// const fetchMovie = async (movieId) => {
//   const url = constructUrl(`movie/${movieId}`);
//   const res = await fetch(url);
//   return res.json();
// };

// // You'll need to play with this function in order to add features and enhance the style.
// const renderMovies = (movies) => {
//   MAIN.innerHTML = ""; //empty the content of the main tag
//   MAIN.style.setProperty("flex-direction", "column");
//   MAIN.style.setProperty("height", "auto");
//   movies.map((movie) => {
//     const movieDiv = document.createElement("div");
//     movieDiv.innerHTML = `
//         <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
//       movie.title
//     } poster">
//         <h3>${movie.title}</h3>`;
//     movieDiv.addEventListener("click", () => {
//       movieDetails(movie);
//     });
//     MAIN.appendChild(movieDiv);
//   });
// };

// // You'll need to play with this function in order to add features and enhance the style.
// const renderMovie = (movie) => {
//   MAIN.innerHTML = `
//     <div class="row">
//         <div class="col-md-4">
//              <img id="movie-backdrop" src=${
//                BACKDROP_BASE_URL + movie.backdrop_path
//              }>
//         </div>
//         <div class="col-md-8">
//             <h2 id="movie-title">${movie.title}</h2>
//             <p id="movie-release-date"><b>Release Date:</b> ${
//               movie.release_date
//             }</p>
//             <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
//             <h3>Overview:</h3>
//             <p id="movie-overview">${movie.overview}</p>
//         </div>
//         </div>
//             <h3>Actors:</h3>
//             <ul id="actors" class="list-unstyled"></ul>
//     </div>`;
// };

// const tryIt = () => {
//   console.log("It is working");
// };

// const renderHome = () => {
//   MAIN.style.setProperty("flex-direction", "row");
//   MAIN.style.setProperty("height", "80rem");
//   MAIN.innerHTML = `
//   <section class="left flex">
//   <div class="text-content flex">
//     <h2><strong>The stranger</strong></h2>
//     <p>
//       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim,
//       omnis magni quidem quis culpa hic praesentium nobis itaque,
//       exercitationem atque, quas provident impedit voluptatem ratione
//       aperiam ex nostrum autem vel?
//     </p>
//     <a href="#"><strong>Watch Trailer</strong></a>
//   </div>
// </section>
// <section class="right flex">
//   <div class="movies-container grid-3">
//     <div class="movie-card">
//       <a href="#">
//         <img
//           class="flex"
//           src="assets/images/Super Mario.jpg"
//           alt="Super Mario"
//         />
//       </a>
//     </div>
//     <div class="movie-card">
//       <a href="#">
//         <img
//           src="assets/images/WhatsApp Image 2023-05-25 at 18.07.47.jpg"
//           alt="Super Mario"
//         />
//       </a>
//     </div>
//     <div class="movie-card">
//       <a href="#">
//         <img
//           src="assets/images/WhatsApp Image 2023-05-25 at 18.08.15.jpg"
//           alt="Super Mario"
//         />
//       </a>
//     </div>
//     <div class="movie-card">
//       <a href="#">
//         <img
//           src="assets/images/WhatsApp Image 2023-05-25 at 18.07.47.jpg"
//           alt="Super Mario"
//         />
//       </a>
//     </div>
//     <div class="movie-card">
//       <a href="#">
//         <img
//           src="assets/images/WhatsApp Image 2023-05-25 at 18.08.15.jpg"
//           alt="Super Mario"
//         />
//       </a>
//     </div>
//     <div class="movie-card">
//       <a href="#">
//         <img src="assets/images/Super Mario.jpg" alt="Super Mario" />
//       </a>
//     </div>
//   </div>
// </section>
//   `;
// };
// // document.addEventListener("DOMContentLoaded", autoRun);
// moviesNavbar.addEventListener("click", autoRun);
// moviesHome.addEventListener("click", renderHome);
