const multiply = (x, y) => x * y;
const square = (x) => x ** 2;
const isRightTriangle = (a, o, h) => square(a) + square(o) === square(h);

console.log(isRightTriangle(3, 4, 5));
console.log(isRightTriangle(4, 5, 6));
