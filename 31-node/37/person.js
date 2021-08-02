import mongoose from "mongoose";
const url = "mongodb://localhost:27017/shopApp";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connection to "${url}" is open.`))
  .catch((err) => console.log(err));

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});

personSchema.pre("save", async function () {
  console.log("About to save!");
});

personSchema.post("save", async function () {
  console.log("Just saved!");
});

const Person = mongoose.model("Person", personSchema);
