import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  await User.deleteMany({});
  const user = new User({
    first: "Harry",
    last: "Potter",
  });
  user.addresses.push({
    street: "123 Seaseme St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });
  const res = await user.save();
  console.log(res);
  return res;
};

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "99 3rd St.",
    city: "New Yorks",
    state: "NY",
    country: "USA",
  });
  const res = await user.save();
  console.log(res);
};

const res = await makeUser();
addAddress(res._id).then(() => {
  mongoose.connection.close();
});
