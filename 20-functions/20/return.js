function add(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    return false;
  }
  return x + y;
}
const ans = add(1, 2);
console.log(ans);
