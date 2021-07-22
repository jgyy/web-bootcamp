// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

// <section id="container"></section>
const container = document.querySelector("#container");
const baseURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const numbers = [];
for (let i = 1; i <= 898; i++) {
  const random = Math.floor(Math.random() * numbers.length);
  numbers.splice(random, 0, i);
}

for (let i of numbers) {
  // <div class="pokemon"></div>
  const pokemon = document.createElement("div");
  pokemon.classList.add("pokemon");
  // <span>#500</span>
  const label = document.createElement("span");
  label.innerText = `#${i}`;
  // <img src="url/500.png"></img>
  const newImg = document.createElement("img");
  newImg.src = `${baseURL}${i}.png`;

  /*<section id="container">
    <div class="pokemon">
      <img src="url/500.png"></img>
      <span>#500</span>
    </div> * 898
  </section>*/
  pokemon.appendChild(newImg);
  pokemon.appendChild(label);
  container.appendChild(pokemon);
}
