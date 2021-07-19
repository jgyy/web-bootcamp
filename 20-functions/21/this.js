const cat = {
  name: "Blue Steele",
  color: "grey",
  breed: "scottish fold",
  meow() {
    console.log("This is: ", this);
    console.log(`${this.name} says MEOWWWW`);
  },
};
console.log(cat.name);
console.log(cat.color);
console.log(cat.breed);
cat.meow();
