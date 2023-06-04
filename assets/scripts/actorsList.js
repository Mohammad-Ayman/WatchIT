import { moviesId } from "./fetch.js";
import { MAIN } from "./moviesList.js";
import { getRandomIndexes, actorsHandler } from "./filter.js";

let actorsPictures = [
  "assets/images/actor1.jpg",
  "assets/images/actor2.jpg",
  "assets/images/actor3.jpg",
  "assets/images/actor4.jpg",
  "assets/images/actor5.jpg",
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

export { renderActorsList, actors };
