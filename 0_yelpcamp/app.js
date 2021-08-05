import express from "express";
import path from "path";
import mongoose from "mongoose";
import methodOverride from "method-override";
import Campground from "./models/campground.js";

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

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  console.log(req.url, req.method);
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  console.log(req.url, req.method);
  const campgrounds = await Campground.find({});
  res.render("campground/index", { campgrounds });
});

app.get("/campgrounds/new", (req, res) => {
  console.log(req.url, req.method);
  res.render("campground/new");
});

app.post("/campgrounds", async (req, res) => {
  console.log(req.url, req.method);
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

app.get("/campgrounds/:id", async (req, res) => {
  console.log(req.url, req.method);
  const campground = await Campground.findById(req.params.id);
  res.render("campground/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  console.log(req.url, req.method);
  const campground = await Campground.findById(req.params.id);
  res.render("campground/edit", { campground });
});

app.put("/campgrounds/:id", async (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

app.listen(3000, () => {
  console.log("Serving on port 3000!");
});
