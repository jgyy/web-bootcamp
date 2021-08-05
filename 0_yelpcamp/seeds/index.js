import mongoose from "mongoose";
import Campground from "../models/campground.js";
import cities from "./cities.js";
import { places, descriptors } from "./seedHelpers.js";
let cityList = cities.sort(() => Math.random() - 0.5);

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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let city of cityList) {
    const camp = new Campground({
      location: `${city.city} ${city.state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
