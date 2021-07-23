const h1 = document.querySelector("h1");
const button = document.querySelector("button");
button.addEventListener("click", (e) => {
  h1.innerText = e;
});

const input = document.querySelector("input");
input.addEventListener("keydown", (e) => {
  h1.innerText = e.code;
});

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      h1.innerText = "UP!";
      break;
    case "ArrowDown":
      h1.innerText = "DOWN!";
      break;
    case "ArrowLeft":
      h1.innerText = "LEFT!";
      break;
    case "ArrowRight":
      h1.innerText = "RIGHT!";
      break;
    default:
      h1.innerText = "IGNORED!";
  }
});
