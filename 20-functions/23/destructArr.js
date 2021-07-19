const scores = [92493, 82017, 71038, 68012, 52816, 41028, 38497, 29751, 18462];

const highScore = scores[0];
const secondHighScore = scores[1];

const [gold, silver, bronze, ...everyoneElse] = scores;
console.log(scores);
console.log(highScore);
console.log(secondHighScore);
console.log(gold);
console.log(silver);
console.log(bronze);
console.log(everyoneElse);
