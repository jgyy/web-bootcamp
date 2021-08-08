import mongoose from "mongoose";
import { LoremIpsum } from "lorem-ipsum";
import Campground from "../models/campground.js";
import cities from "./cities.js";
import { places, descriptors } from "./seedHelpers.js";

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});

const lorem = new LoremIpsum({ wordsPerSentence: { max: 99, min: 1 } });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const image = () => {
  const url = "https://source.unsplash.com/random/";
  const w = Math.floor((Math.random() - 0.5) * 100) + 800;
  const h = Math.floor((Math.random() - 0.5) * 100) + 450;
  return `${url}${w}x${h}`;
};

const cityList = cities.sort(() => Math.random() - 0.5);
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let city of cityList) {
    const camp = new Campground({
      location: `${city.city} ${city.state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: image(),
      description: lorem.generateSentences(1),
      price: Math.floor(Math.random() * 10000) / 100,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
