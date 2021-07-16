const fs = require("fs");
const animals = JSON.parse(fs.readFileSync("animals.json", "utf8"));
console.log(typeof animals);

for (let i = animals.length - 1; i >= 0; i--) {
  console.log(animals[i]);
}
