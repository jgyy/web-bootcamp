const winner = "has-text-success";
const loser = "has-text-danger";
// Custom code to generate select options from 3-11
const select = document.querySelector("#playto");
for (let i = 3; i <= 11; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  select.appendChild(option);
}

const p1 = {
  button: document.querySelector("#p1Button"),
  display: document.querySelector("#p1Display"),
  score: 0,
};
const p2 = {
  button: document.querySelector("#p2Button"),
  display: document.querySelector("#p2Display"),
  score: 0,
};

const resetButton = document.querySelector("#reset");
let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score++;
    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add(winner);
      opponent.display.classList.add(loser);
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

p1.button.addEventListener("click", function () {
  updateScores(p1, p2);
});
p2.button.addEventListener("click", function () {
  updateScores(p2, p1);
});

function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = 0;
    p.display.classList.remove(winner, loser);
    p.button.disabled = false;
  }
}
select.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});
resetButton.addEventListener("click", reset);
