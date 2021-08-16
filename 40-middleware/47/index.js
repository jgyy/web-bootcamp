import express from "express";
import cookieParser from "cookie-parser";
import shelterRoutes from "./routes/shelters.js";
import dogRoutes from "./routes/dogs.js";
import adminRoutes from "./routes/admin.js";
const app = express();

app.use(cookieParser("secret"));
app.use("/shelters", shelterRoutes);
app.use("/dogs", dogRoutes);
app.use("/admin", adminRoutes);

app.get("/greet", (req, res) => {
  const { name = "anon" } = req.cookies;
  res.send(`Hello, ${name}!`);
});

app.get("/setname", (req, res) => {
  res.cookie("name", "jgyy");
  res.cookie("animal", "shrimp");
  res.send("OK SENT YOU A COOKIE.");
});

app.get("/getsignedcookie", (req, res) => {
  res.cookie("fruit", "grape", { signed: true });
  res.send("SIGNED YOUR FRUIT COOKIE");
});

app.get("/verifyfruit", (req, res) => {
  res.send(req.signedCookies);
});

app.listen(3000, () => {
  console.log("Serving app on localhost:3000");
});
