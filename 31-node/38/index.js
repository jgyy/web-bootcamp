import express from "express";
const app = express();
import path from "path";
import Product from "./models/product.js";
import methodOverride from "method-override";

import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`mongodb://localhost:27017/farmStand connected!`);
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.set("useFindAndModify", false);

const categories = ["fruit", "vegetable", "dairy"];
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  console.log(req.url, req.method);
  res.redirect("products");
});

app.get("/products", async (req, res) => {
  console.log(req.url, req.method);
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products, category });
  } else {
    let products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});

app.get("/products/new", (req, res) => {
  console.log(req.url, req.method);
  res.render("products/new", { categories });
});

app.post("/products", async (req, res) => {
  console.log(req.url, req.method);
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  console.log(req.url, req.method);
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
