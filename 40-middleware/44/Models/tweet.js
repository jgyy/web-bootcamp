import mongoose from "mongoose";
const { Schema } = mongoose;

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

const userSchema = new Schema({
  username: String,
  age: Number,
});

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);
await User.deleteMany({});
await Tweet.deleteMany({});

const makeTweet = async () => {
  const user = new User({ username: "chickenfan", age: 61 });
  await user.save();
  const tweet1 = new Tweet({ text: "Chicken family are everywhere", likes: 0 });
  const tweet2 = new Tweet({ text: "I'm hungry, want eat chicken", likes: 1 });
  tweet1.user = user;
  tweet2.user = user;
  await tweet1.save();
  await tweet2.save();
};

const findTweet = async () => {
  const tweet = await Tweet.find({}).populate("user");
  console.log(tweet);
};

await makeTweet();
await findTweet();
mongoose.connection.close();
