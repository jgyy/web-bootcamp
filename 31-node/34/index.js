import express from "express";
import path from "path";
import fs from "fs";
const redditData = JSON.parse(fs.readFileSync("./data.json", "utf8"));
const app = express();

app.use(express.static(path.join(process.cwd(), "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "/views"));

app.get("/", (req, res) => {
  console.log(req.path, req.method);
  res.render("home");
});

app.get("/cats", (req, res) => {
  console.log(req.path, req.method);
  const cats = [
    "Jesusa",
    "Denese",
    "David",
    "Hung",
    "Gia",
    "Dori",
    "Tiffanie",
    "Chang",
  ];
  res.render("cats", { cats });
});

app.get("/r/:subreddit", (req, res) => {
  console.log(req.path, req.method);
  const { subreddit } = req.params;
  const data = redditData[subreddit];

  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
});

app.get("/rand", (req, res) => {
  console.log(req.path, req.method);
  const num = Math.floor(Math.random() * 10 ** 10);
  res.render("random", { num });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
