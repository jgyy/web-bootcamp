const movies = [
  { title: "Amadeus", score: 99 },
  { title: "Stand By Me", score: 85 },
  { title: "Parasite", score: 95 },
  { title: "Alien", score: 90 },
];
const newMovies = movies.map(
  (movie) => `${movie.title} - ${movie.score / 10}/10`
);
console.log(newMovies);
