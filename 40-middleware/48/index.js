import express from "express";
import path from "path";
import mongoose from "mongoose";
import session from "express-session";
import flash from "connect-flash";
import Farm from "./models/farm.js";

const app = express();
const sessionOptions = {
  secret: "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));
app.use(flash());

mongoose
  .connect("mongodb://localhost:27017/flashDemo", {
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

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

// FARM ROUTES

app.use((req, res, next) => {
  res.locals.messages = req.flash("success");
  next();
});

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms });
});
app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});
app.get("/farms/:id", async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate("products");
  res.render("farms/show", { farm });
});

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  req.flash("success", "Successfully made a new farm!");
  res.redirect("/farms");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
