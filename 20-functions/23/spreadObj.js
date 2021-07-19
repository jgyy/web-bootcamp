const feline = { legs: 4, family: "Felidae" };
const canine = { isFurry: true, family: "Caninae" };
const catDog = { ...feline, ...canine };
console.log(feline);
console.log(canine);
console.log(catDog);

const data = {
  email: "blueman@gmail.com",
  password: "tobias123!",
  username: "tfunke",
};
const newUser = { ...data, id: 2345, isAdmin: false };
console.log(data);
console.log(newUser);
