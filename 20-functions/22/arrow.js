const add = (x, y) => {
  return x + y;
};

const square = (num) => {
  return num ** 2;
};

const rollDie = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const value = [add(1, 2), square(3), rollDie()];
console.log(value);
