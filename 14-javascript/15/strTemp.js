let product = "Artichoke";
let price = 3.99;
price = 2.25;
let qty = 5;
let sentence =
  "You bought " + qty + " " + product + " Total is: " + price * qty;
console.log(sentence);
console.log(`hello!`);
console.log(`hello ${1 + 4 + 3 + 4}`);
console.log("hello ${1 + 4 + 3 + 4}");
let senNew = `You bought ${qty} ${product.toUpperCase()}. Total is: $${
  price * qty
}`;
console.log(senNew);
