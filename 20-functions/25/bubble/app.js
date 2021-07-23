const button = document.querySelector("#changeColor");
const container = document.querySelector("#container");

const color = () => {
  let col = "#";
  for (let i = 0; i < 8; i++) {
    const num = Math.floor(Math.random() * 16);
    col += num.toString(16);
  }
  return col;
};

button.addEventListener("click", function (e) {
  container.style.backgroundColor = color();
  e.stopPropagation();
});
container.addEventListener("click", function () {
  this.classList.toggle("hide");
});
