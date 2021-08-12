import mongoose from "mongoose";
import Campground from "../models/campground.js";
import { campgroundDetails, cityList } from "./campgroundDetails.js";

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

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let city of cityList()) {
    const camp = new Campground(campgroundDetails(city));
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
