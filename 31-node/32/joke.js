import jokes from "give-me-a-joke";
import colors from "colors";

const total = Math.floor(Math.random() * 99);
let count = 0;
const id = setInterval(() => {
  jokes.getRandomDadJoke((joke) => {
    console.log(joke.rainbow, `${count}/${total}`.rainbow);
  });
  count++;
  if (count >= total) clearInterval(id);
}, 500);
