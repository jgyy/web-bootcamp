const add = (x, y) => x + y;

const square = (num) => num ** 2;

const rollDie = () => (
  Math.floor(Math.random() * 6) + 1
);

const value = [add(1, 2), square(3), rollDie()];
console.log(value);
