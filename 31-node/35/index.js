import express from "express";
import path from "path";
import { v4 as uuid } from "uuid";
import methodOverride from "method-override";
import fs from "fs";
let comments = JSON.parse(fs.readFileSync("./data.json", "utf8"));
for (let i = 0; i < comments.length; i++) comments[i].id = uuid();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.get("/comments", (req, res) => {
  console.log(req.url, req.method);
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  console.log(req.url, req.method);
  res.render("comments/new", { comments });
});

app.post("/comments", (req, res) => {
  console.log(req.url, req.method);
  const { username, comment } = req.body;
  if (username && comment) {
    comments.push({ username, comment, id: uuid() });
    res.redirect("/comments");
  } else {
    res.redirect("/comments/new");
  }
});

app.get("/comments/:id", (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  if (comment) res.render("comments/show", { comment });
  else res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  if (comment) res.render("comments/edit", { comment });
  else res.redirect("/comments");
});

app.patch("/comments/:id", (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  if (foundComment) foundComment.comment = newCommentText;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  if (id) comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  console.log(req.url, req.method);
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  console.log(req.url, req.method);
  const { meat, qty } = req.body;
  if (meat && qty) res.send(`OK, here are your ${qty} ${meat} taco.`);
  else res.send("POST /tacos response:");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
