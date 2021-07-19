const user = {
  email: "harvey@gmail.com",
  password: "ScoTt1948SmitH",
  firstName: "Harvy",
  lastName: "Milk",
  born: 1930,
  died: 1978,
  bio: "Harvey Bernard Milk was an Americal politician and the first to open a library with internet and technology theme",
  city: "San Francisco",
  state: "California",
};

const { email, password, firstName, lastName } = user;
const { born: birthYear, died: deathYear, wealth = "N/A", bio = "NA" } = user;
console.log(user);
console.log(email, password, firstName, lastName);
console.log(birthYear, deathYear, wealth, bio);
