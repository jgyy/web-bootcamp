import express from "express";
import morgan from "morgan";
import AppError from "./appError.js";
const app = express();

app.use(morgan("tiny"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I LOVE DOGS!!");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "0") return next();
  else if (password) throw new AppError("Password incorrct!", 401);
  else if (!password) throw new AppError("Password required!", 401);
};

app.get("/", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("HOME PAGE!");
});

app.get("/error", (req, res) => {
  coocle();
});

app.get("/dogs", (req, res) => {
  console.log(`REQUEST DATE: ${req.requestTime}`);
  res.send("WOOF WOOF!");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("MY SECRET IS: Sometimes I wear headphones in public.");
});

app.get("/admin", (req, res) => {
  throw new AppError("You are not an admin!", 403);
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("App is running on localhost:3000");
});
