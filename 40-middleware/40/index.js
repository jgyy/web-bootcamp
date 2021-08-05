import express from "express";
import morgan from "morgan";
const app = express();

app.use(morgan("common"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("DOGS!");
  next();
});

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "0") next();
  else res.send("Sorry you need a valid password!");
};

app.get("/", (req, res) => {
  res.send("HOMEPAGE");
});

app.get("/dogs", (req, res) => {
  res.send("DOGS");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("SECRET");
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!");
});

app.listen(3000, () => {
  console.log("Listening to port 3000 now on localhost.");
});
