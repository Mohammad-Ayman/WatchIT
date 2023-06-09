"use strict";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
let moviesList = [],
  toBeSortedMoviesList = [],
  moviesId = [];
const autoRun = async () => {
    let e = await fetchMovies();
    (moviesList = [...e.results]),
      (toBeSortedMoviesList = [...e.results]),
      console.log("moviesList:"),
      console.log(moviesList),
      getIds();
  },
  constructUrl = (e) =>
    `https://api.themoviedb.org/3/${e}?api_key=949427db6a46ecc017077039c6981bb4&with_genres=16&page=20`,
  // `https://api.themoviedb.org/3/${e}?api_key=949427db6a46ecc017077039c6981bb4&  `,
  // constructUrl = (e) =>
  //   `https://api.themoviedb.org/3/${e}?api_key=${atob(
  //     "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  //   )}`,
  fetchMovies = async () =>
    (await fetch(constructUrl("discover/movie"))).json(),
  fetchMovie = async (e) => (await fetch(constructUrl(`movie/${e}`))).json(),
  searchNavbar = document.getElementById("search");
let moviesPopularity = [],
  moviesReleaseDate = [],
  moviesTopRated = [],
  filteredMovies = [],
  filteredActors = [];
const getIds = () => {
  moviesList.forEach((e) => {
    moviesId.push(e.id);
  }),
    console.log(moviesId);
};
function getRandomIndexes(e, t) {
  let i = [];
  for (; i.length < t; ) {
    let r = Math.floor(Math.random() * e.length);
    -1 === i.indexOf(r) && i.push(r);
  }
  return i;
}
const createCard = (e, t) => {
    let i = document.createElement("div");
    return (
      i.classList.add("movie-card"),
      (i.innerHTML = `
    <img loading="lazy"
      class="flex"
      src="${BACKDROP_BASE_URL + e}"
      alt="${t}"
      />
      `),
      i
    );
  },
  getCLosestImg = (e) => {
    if (
      (console.log(e.target),
      console.log(e.target.tagName),
      e.target.tagName === "IMG")
    ) {
      let t = e.target.closest(" img").getAttribute("alt");
      return console.log(t), t;
    }
  },
  getActorToBeViewedId = (e) => {
    let t = getCLosestImg(e);
    return actors.findIndex((e) => e.name === t);
  },
  actorsHandler = (e) => {
    let t = getActorToBeViewedId(e);
    renderSingleActor(actors[t]);
  },
  getMovieToBeViewedId = (e) => {
    let t = +getCLosestImg(e);
    return moviesId.indexOf(t);
  },
  moviesHandler = (e) => {
    let t = getMovieToBeViewedId(e);
    renderSingleMovie(moviesList[t]);
  },
  searchForMovies = () => {
    let e = searchNavbar.value.trim().toLowerCase();
    (filteredMovies = []),
      (filteredActors = []),
      moviesList.forEach((t) => {
        t.original_title.toLowerCase().includes(e) && filteredMovies.push(t);
      }),
      actors.forEach((t) => {
        t.name.toLowerCase().includes(e) && filteredActors.push(t);
      }),
      renderMovies(filteredMovies, `Results containing ${e}`);
  },
  searchBtnHandler = () => {
    console.log(searchNavbar.value.trim()),
      searchForMovies(),
      console.log(filteredMovies),
      (searchNavbar.value = "");
  },
  sortNumberArray = () => {
    (moviesPopularity = [
      ...toBeSortedMoviesList.sort((e, t) => t.popularity - e.popularity),
    ]),
      console.log(moviesPopularity),
      renderMovies(moviesPopularity, "Popular Movies");
  },
  sortTopRatedArray = () => {
    (moviesTopRated = [
      ...toBeSortedMoviesList.sort((e, t) => t.vote_average - e.vote_average),
    ]),
      console.log(moviesTopRated),
      renderMovies(moviesTopRated, "Top Rated Movies");
  },
  sortDateArray = () => {
    (moviesReleaseDate = [
      ...toBeSortedMoviesList.sort(
        (e, t) => new Date(e.release_date) - new Date(t.release_date)
      ),
    ]),
      console.log(moviesReleaseDate),
      renderMovies(moviesReleaseDate, "Most Recent Movies");
  },
  scrollToTop = () => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
      // behavior: "auto",
      block: "start",
    });
  },
  checkScreenWidth = () => {
    window.matchMedia("(max-width: 749px)").matches
      ? MAIN.style.setProperty("height", "auto")
      : MAIN.style.setProperty("height", "80rem");
  },
  renderHome = () => {
    scrollToTop();
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
    let e = document.createElement("section");
    e.classList.add("right", "flex"),
      (e.innerHTML = `
  <div class="welcome">
  <p class="center-text">Welcome to Watch<span>IT</span> <br> <span id="hello">Our Recommended Movies, For You </span> </p>
  </div>
    <div class="movies-container grid-3">
    </div>
  `),
      renderRecommendedMovies(e, "movies-container"),
      MAIN.appendChild(e),
      e
        .querySelector(".movies-container")
        .addEventListener("click", moviesHandler);
  },
  renderRecommendedMovies = (e, t) => {
    let i = getRandomIndexes(moviesList, 6);
    console.log(i),
      i.forEach((i) => {
        let r = createCard(moviesList[i].backdrop_path, moviesList[i].id);
        e.querySelector(`.${t}`).appendChild(r);
      });
  },
  PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185",
  BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780",
  MAIN = document.querySelector(".main"),
  applyRenderMovies = async () => {
    renderMovies(moviesList, "Movies");
  },
  renderMovies = (e, t) => {
    scrollToTop();
    (MAIN.innerHTML = ""),
      MAIN.classList.add("actors-main"),
      MAIN.style.setProperty("height", "100%");
    let i = document.createElement("section");
    i.innerHTML = `
  <h2 class="actors-h2">${t}</h2>
  `;
    let r = document.createElement("ul");
    r.classList.add("actors-ul"),
      i.append(r),
      e.forEach((e) => {
        let t = document.createElement("li");
        (t.innerHTML = `
    <img loading="lazy" class="actor-box" 
    src="${BACKDROP_BASE_URL + e.poster_path}" alt="${e.id}">
        <p class="actors-p">${e.title}</p>`),
          r.appendChild(t);
      }),
      MAIN.appendChild(i),
      r.addEventListener("click", moviesHandler);
  },
  renderSingleMovie = (e) => {
    scrollToTop();
    MAIN.style.setProperty("height", "auto"),
      // <div id="main-bg1" style="background-image: linear-gradient(to bottom, #101010, #1F1F1F, #101010), url('${
      //   BACKDROP_BASE_URL + e.backdrop_path
      // }');
      // background-repeat: no-repeat;
      // background-size: 100% 100%;
      // opacity: 0.8;">
      (MAIN.innerHTML = `
      <div id="main-bg"> 
      <div class="info">
          <h1 id="title-name">${e.title}</h1>
          <div>
              <div id="side-info">
                  <div>
                      <div><h3>Release Date</h3><p>${e.release_date}</p></div>
                      <div><h3>Popularity</h3><p>${e.popularity}</p></div>
                  </div>
                  <div>
                      <div><h3>Language</h3><p>${e.original_language.toUpperCase()}</p></div>
                      <div><h3>Rate</h3><p>${e.vote_average}/10</p></div>
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
          ${e.overview} ${e.overview}
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
          `);
    document
      .getElementById("spidy")
      .style.setProperty(
        "background-image",
        "url(" + BACKDROP_BASE_URL + e.poster_path + ")"
      ),
      renderRelatedActors(e),
      renderRelatedMovies(e);
  },
  renderRelatedMovies = (e) => {
    let t = document.querySelector("#similar .actmovie"),
      i = document.createElement("ul");
    i.classList.add("actors-ul"), t.append(i);
    let r = getRandomIndexes(moviesList, 6);
    console.log(r),
      r.forEach((e) => {
        let t = document.createElement("li");
        (t.innerHTML = `
    <img  class="actor-box" 
    src="${BACKDROP_BASE_URL + moviesList[e].poster_path}" alt="${
          moviesList[e].id
        } ">
        <p class="actors-p">${moviesList[e].title}</p>`),
          i.appendChild(t);
      }),
      i.addEventListener("click", moviesHandler);
  },
  renderRelatedActors = (e) => {
    let t = document.querySelector("#actors .actmovie"),
      i = document.createElement("ul");
    i.classList.add("actors-ul"),
      t.append(i),
      actors.forEach((t) => {
        t.listOfMovies.forEach((r) => {
          if (r === e.id) {
            let a = document.createElement("li");
            (a.innerHTML = `
    <img  class="actor-box" 
    src="${t.pictureUrl}" alt="${t.name}">
        <p class="actors-p">${t.name}</p>`),
              i.appendChild(a);
          }
        });
      }),
      i.addEventListener("click", actorsHandler);
  };
let actorsPictures = [
    "assets/images/actor1.jpg",
    "assets/images/actor2.jpg",
    "assets/images/actor3.jpg",
    "assets/images/actor4.jpg",
    "assets/images/actor5.jpg",
  ],
  actors = [
    {
      name: "Actor 1",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      //  pictureUrl:  ,
      popularity: "400",
      birthday: "24.09.2000",
      biography: "Some text will be written over here",
      // listOfMovies: setTimeout(() => {
      //   const randomIndexes = getRandomIndexes(moviesId, 5);
      //   console.log(randomIndexes);
      //   return randomIndexes;
      //   // Perform further operations with the randomIndexes array
      // }, 1000),
      listOfMovies: [9982, 23566, 765172],
    },
    {
      name: "Actor 2",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 786,
      birthday: "15.03.1987",
      biography: "Sed do eiusmod tempor incididunt.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [9473, 413594, 896221, 774741],
    },
    {
      name: "Actor 3",
      gender: "Female",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 249,
      birthday: "05.11.1992",
      biography: "Lorem ipsum dolor sit amet.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [137116, 13004, 378236, 18491],
    },
    {
      name: "Actor 4",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 532,
      birthday: "10.07.1985",
      biography: "Consectetur adipiscing elit.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [989937, 677638, 11619, 5559],
    },
    {
      name: "Actor 5",
      gender: "Female",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 943,
      birthday: "27.12.1990",
      biography: "Praesent vitae fringilla erat.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [38142, 15167, 16859, 12222, 374205],
    },
    {
      name: "Actor 6",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 620,
      birthday: "18.05.1988",
      biography: "Vestibulum ante ipsum primis.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [989937, 677638, 11619, 5559],
    },
    {
      name: "Actor 7",
      gender: "Female",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 117,
      birthday: "09.02.1995",
      biography: "Donec id mattis lectus.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [23566, 413594, 5559, 16859, 374205],
    },
    {
      name: "Actor 8",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 847,
      birthday: "21.11.1991",
      biography: "Aenean volutpat justo at.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [765172, 896221, 677638, 38142, 16859],
    },
    {
      name: "Actor 9",
      gender: "Female",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 395,
      birthday: "02.09.1989",
      biography: "Mauris vulputate est vitae.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [9473, 413594, 16859, 374205],
    },
    {
      name: "Actor 10",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 502,
      birthday: "14.06.1996",
      biography: "Nam ullamcorper justo ac.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [137116, 18491, 989937, 5559, 12222],
    },
    {
      name: "Actor 11",
      gender: "Female",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 673,
      birthday: "25.03.1993",
      biography: "Vestibulum non metus a.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [137116, 18491, 989937, 5559, 12222],
    },
    {
      name: "Actor 12",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 178,
      birthday: "07.12.1997",
      biography: "Integer condimentum massa a.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [9473, 677638, 5559, 38142, 15167],
    },
    {
      name: "Actor 13",
      gender: "Female",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 815,
      birthday: "30.09.1986",
      biography: "Fusce rhoncus mauris quis.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [9982, 9473, 11619, 38142, 15167],
    },
    {
      name: "Actor 14",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 251,
      birthday: "22.08.1994",
      biography: "Pellentesque habitant morbi tristique.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [23566, 896221, 11619, 15167, 12222, 374205],
    },
    {
      name: "Actor 15",
      gender: "Female",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 739,
      birthday: "03.05.1999",
      biography: "Nullam a ultrices neque.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [765172, 678638, 989937, 15167, 12222],
    },
    {
      name: "Actor 16",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 426,
      birthday: "15.02.1985",
      biography: "Etiam efficitur magna eu.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [9473, 896221, 678638, 5559, 12222],
    },
    {
      name: "Actor 17",
      gender: "Female",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 567,
      birthday: "26.12.1991",
      biography: "Vivamus in velit eu.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [137116, 13004, 11619, 38142, 16859],
    },
    {
      name: "Actor 18",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 943,
      birthday: "07.10.1998",
      biography: "Suspendisse potenti.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [18491, 677638, 5559, 16859, 12222],
    },
    {
      name: "Actor 19",
      gender: "Female",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 312,
      birthday: "18.07.1993",
      biography: "Phasellus eleifend nulla ac.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [989937, 15167, 12222, 374205],
    },
    {
      name: "Actor 20",
      gender: "Male",
      pictureUrl: actorsPictures[getRandomIndexes(actorsPictures, 1)],
      popularity: 678,
      birthday: "29.04.1990",
      biography: "Morbi rutrum massa ut.",
      // listOfMovies: getRandomIndexes(moviesId, 5),
      listOfMovies: [13004, 678638, 5559, 15167, 12222],
    },
  ];

console.log(actors);
const renderActorsList = (e) => {
    scrollToTop();
    (MAIN.innerHTML = ""),
      MAIN.classList.add("actors-main"),
      MAIN.style.setProperty("height", "100%");
    let t = document.createElement("section");
    t.innerHTML = `
  <h2 class="actors-h2">Actors</h2>
  `;
    let i = document.createElement("ul");
    i.classList.add("actors-ul"),
      t.append(i),
      e.forEach((e) => {
        let t = document.createElement("li");
        (t.innerHTML = `
      <img loading="lazy" class="actor-box"
      src=${e.pictureUrl}  alt="${e.name}">
      <p class="actors-p">${e.name}</p>
    `),
          console.log(e),
          i.appendChild(t);
      }),
      MAIN.appendChild(t),
      i.addEventListener("click", actorsHandler);
  },
  renderSingleActor = (e) => {
    scrollToTop();
    MAIN.style.setProperty("height", "100%"),
      (MAIN.innerHTML = `
  <div class="actorReview">
      <div id="main-bg" class="flex">
          <div class="info">
              <h3 class="singleActor-h3">${e.name}</h3>
              <div id="top-info">
                  <div id="side-info">
                      <div class="st-info">
                          <div>
                              <h5 class="singleActor-h5">Gender</h5>
                              <p class="singleActor-p">${e.gender}</p>
                          </div>
                          <div>
                              <h5 class="singleActor-h5">Popularity</h5>
                              <p class="singleActor-p">${e.popularity}</p>
                          </div>
                      </div>
                      <div class="nd-info">
                          <div>
                              <h5 class="singleActor-h5">Birthday</h5>
                              <p class="singleActor-p">${e.birthday}</p>
                          </div>
                          <div>
                              <h5 class="singleActor-h5">Deathday</h5>
                              <p class="singleActor-p">Not yet</p>
                          </div>
                      </div>
                  </div>
                  <div id="act-picture" style="background-image: url(${e.pictureUrl});"></div>
                  <div id="bio-info">
                      <h4 class="singleActor-h4">Biography</h4>
                      <p class="singleActor-p">
                      ${e.biography}
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
      `),
      renderActorRelatedMovies(e);
  },
  renderActorRelatedMovies = (e) => {
    e.listOfMovies.forEach((e) => {
      moviesList.forEach((t) => {
        if (e === t.id) {
          let i = document.querySelector("#similar .actmovie"),
            r = document.createElement("ul");
          r.classList.add("actors-ul"), i.append(r);
          let a = document.createElement("li");
          (a.innerHTML = `
         <img  class="actor-box" 
         src="${BACKDROP_BASE_URL + t.poster_path}" alt="${t.id} ">
         <p class="actors-p">${t.title}</p>`),
            r.appendChild(a),
            r.addEventListener("click", moviesHandler);
        }
      });
    });
  },
  logo = document.querySelector(".logo"),
  moviesHome = document.querySelector("li"),
  moviesNavbar = document.getElementById("movies-navbar"),
  actorsNavbar = document.getElementById("actors-navbar"),
  searchBtn = document.querySelector(".search-icon"),
  filterPopular = document.getElementById("popular-filter"),
  filterReleaseDate = document.getElementById("release-date-filter"),
  filterTopRated = document.getElementById("top-rated-filter");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown");

document.addEventListener("DOMContentLoaded", () => autoRun().then(renderHome)),
  moviesNavbar.addEventListener("click", applyRenderMovies),
  moviesHome.addEventListener("click", renderHome),
  logo.addEventListener("click", renderHome),
  actorsNavbar.addEventListener("click", renderActorsList.bind(null, actors)),
  searchBtn.addEventListener("click", searchBtnHandler),
  filterPopular.addEventListener("click", sortNumberArray),
  filterReleaseDate.addEventListener("click", sortDateArray),
  filterTopRated.addEventListener("click", sortTopRatedArray);
dropdownToggle.addEventListener("click", () => {
  dropdownMenu.classList.toggle("show");
});
