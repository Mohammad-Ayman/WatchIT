import { MAIN } from "./moviesList.js";
import { getRandomIndexes, actorsHandler } from "./filter.js";

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

export { renderActorsList, actors };
