const evens = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
const reduces = [
  evens.reduce((sum, num) => sum + num, 10),
  evens.reduce((sum, num) => sum + num, 20),
  evens.reduce((sum, num) => sum + num, 40),
  evens.reduce((sum, num) => sum + num, 80)
];
console.log(reduces);
