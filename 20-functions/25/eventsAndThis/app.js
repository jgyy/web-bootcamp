const script = document.querySelector("script");
const create = (tag, text, repeat) => {
  for (let i = 0; i < repeat; i++) {
    const createTag = document.createElement(tag);
    createTag.innerText = text;
    script.before(createTag);
  }
};
create("button", "CLICK", 36);
create("h1", "Click Me!", 13);

const makeRandColor = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};
const buttons = document.querySelectorAll("button");

for (let button of buttons) {
  button.addEventListener("click", colorize);
}

const h1s = document.querySelectorAll("h1");
for (let h1 of h1s) {
  h1.addEventListener("click", colorize);
}

function colorize() {
  this.style.backgroundColor = makeRandColor();
  this.style.color = makeRandColor();
}
