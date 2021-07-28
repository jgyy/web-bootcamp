String.prototype.yell = function () {
  return `OMG!!!! ${this.toUpperCase()} ARGH!!!!`;
};

Array.prototype.popping = function () {
  return "SORRY I WANT THAT ELEMENT, I WILL NEVER POP IT OFF!";
};

const str = "hello world!";
console.log(str.yell());
const arr = [1, 2, 3, 4];
console.log(arr.popping());