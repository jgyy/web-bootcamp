function makeMysteryFunc() {
  const rand = Math.random();
  if (rand > 0.5) {
    return function () {
      console.log("This is function number two.");
      console.log("You have a high score!");
    };
  } else {
    return function () {
      console.log("This is function number one.");
      console.log("You have a low score!");
    };
  }
}

const randoms = makeMysteryFunc();
randoms();

function makeBetweenFunc(min, max) {
  return function (num) {
    return num >= min && num <= max;
  };
}

const tens = makeBetweenFunc(10, 20);
const twenties = makeBetweenFunc(20, 30);
console.log(tens(11));
console.log(tens(1));
console.log(twenties(12));
console.log(twenties(22));
