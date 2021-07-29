import express from "express";
const app = express();

app.get("/", (req, res) => {
  console.log(req.path, req.method);
  res.send("This is the home page!");
});

app.get("/r/:subreddit", (req, res) => {
  console.log(req.path, req.method);
  const { subreddit } = req.params;
  res.send(`<h1>Browsing the ${subreddit} subreddit!</h1>`);
});

app.get("/r/:subreddit/:postId", (req, res) => {
  console.log(req.path, req.method);
  const { subreddit, postId } = req.params;
  res.send(
    `<h1>Viewing the Post ID: ${postId} on the ${subreddit} subreddit!</h1>`
  );
});

app.get("/cats", (req, res) => {
  console.log(req.path, req.method);
  res.send("MEOW!!");
});

app.post("/cats", (req, res) => {
  console.log(req.path, req.method);
  res.send("Post request to /cats");
});

app.get("/dogs", (req, res) => {
  console.log(req.path, req.method);
  res.send("WOOF!!");
});

app.get("/search", (req, res) => {
  console.log(req.path, req.method);
  const { q } = req.query;
  if (!q) res.send("Nothing found if nothing searched.");
  else res.send(`<h1>Search result for: ${q}</h1>`);
});

app.get("*", (req, res) => {
  console.log(req.path, req.method);
  res.send("I dont know that path");
});

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
