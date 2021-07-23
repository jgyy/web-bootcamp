const button = document.querySelector("button");
const h1 = document.querySelector("h1");

const color = () => {
  let col = "#";
  for (let i = 0; i < 8; i++) {
    const num = Math.floor(Math.random() * 16);
    col += num.toString(16);
  }
  return col;
};

button.addEventListener("click", () => {
  const randomColor = color();
  document.body.style.backgroundColor = randomColor;
  h1.innerText = randomColor.toUpperCase();
});
