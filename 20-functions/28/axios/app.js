const jokes = document.querySelector("#jokes");
const button = document.querySelector("button");

const addNewJoke = async () => {
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, 1000);
  const jokeText = await getDadJokes();
  const newLI = document.createElement("li");
  newLI.append(jokeText);
  jokes.append(newLI);
};
const getDadJokes = async () => {
  try {
    const config = { headers: { Accept: "application/json" } };
    const res = await axios("https://icanhazdadjoke.com/", config);
    return res.data.joke;
  } catch (e) {
    console.error(e);
    return "NO JOKES AVAILABLE! SORRY:(";
  }
};

button.addEventListener("click", addNewJoke);
