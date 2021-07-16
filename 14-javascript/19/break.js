const readline = require("readline-sync");
const prompt = (description) => readline.question(description);

while (true) {
  const input = prompt("Hey say something: ");
  if (input.toLowerCase() == "stop copying me") break;
  console.log(input);
}
