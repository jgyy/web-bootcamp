let cats = ["blue", "kitty"];
let dogs = ["rusty", "wyatt"];
console.log(cats.concat(dogs));
console.log(cats);
let comboParty = dogs.concat(cats);
console.log(comboParty);
console.log(cats.includes("Blue"));
console.log(cats.includes("blue"));
console.log("Blue".indexOf("B"));
console.log("Blue".indexOf("e"));
console.log("Blue".indexOf("0"));
console.log(comboParty.indexOf("rusty"));
console.log(comboParty.indexOf("kitty"));
console.log(comboParty.indexOf("QWDEFV"));
console.log(comboParty.reverse());
comboParty.push("blue");
console.log(comboParty.indexOf("blue"));