import express from "express";
import path from "path";
import mongoose from "mongoose";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import morgan from "morgan";
import Campground from "./models/campground.js";
import catchFunc from "./utils/catchAsync.js";
import ExpressError from "./utils/ExpressError.js";
import campgroundSchema from "./schemas.js";
import { campgroundDetails, cityList } from "./seeds/campgroundDetails.js";

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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(morgan("combined"));

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

app.get(
  "/",
  catchFunc((req, res, next) => {
    res.render("home");
  }
));

app.get(
  "/campgrounds",
  catchFunc(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render("campground/index", { campgrounds });
  })
);

app.get(
  "/campgrounds/new",
  catchFunc((req, res, next) => {
    const campgroundDetail = campgroundDetails(cityList()[0])
    res.render("campground/new", { campgroundDetail });
  })
);

app.post(
  "/campgrounds",
  validateCampground,
  catchFunc(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.get(
  "/campgrounds/:id",
  catchFunc(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campground/show", { campground });
  })
);

app.get(
  "/campgrounds/:id/edit",
  catchFunc(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campground/edit", { campground });
  })
);

app.put(
  "/campgrounds/:id",
  validateCampground,
  catchFunc(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  "/campgrounds/:id",
  catchFunc(async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

app.all(
  "*",
  catchFunc((req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
  })
);

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000!");
});
