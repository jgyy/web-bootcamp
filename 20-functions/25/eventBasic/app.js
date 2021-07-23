const btn2 = document.querySelector("#v2");
btn2.onclick = () => {
  alert("YOU CLICKED ME");
};
btn2.onmouseenter = () => {
  alert("AAAAAAAAHHHHHHHH");
};

document.querySelector("h1").onclick = () => {
  alert("you clicked the h1");
};

const btn3 = document.querySelector("#v3");
btn3.addEventListener("click", () => {
  alert("CLICKED!");
});

function twist() {
  alert("TWIST!");
}
function shout() {
  alert("SHOUT!");
}
const tasButton = document.querySelector("#tas");
tasButton.addEventListener("click", twist);
tasButton.addEventListener("click", shout);
