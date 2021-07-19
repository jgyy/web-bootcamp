function rollDie(numSides = 6) {
  return Math.floor(Math.random() * numSides) + 1;
}
console.log(rollDie());
console.log(rollDie(99));

function greet(person, msg = "Hey there", punc = "!") {
    console.log(`${msg}, ${person}${punc}`);
}
greet("Ricas");