import express from "express";
import path from "path";
import mongoose from "mongoose";
import methodOverride from "method-override";
import AppError from "./AppError.js";
import Product from "./models/product.js";
import Farm from "./models/Farm.js";

mongoose
  .connect("mongodb://localhost:27017/farmStand2", {
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

const app = express();
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Farm Routes
app.get(
  "/farms",
  wrapAsync(async (req, res) => {
    const farms = await Farm.find({});
    if (!farms) throw new AppError("Farms Not Found", 404);
    res.render("farms/index", { farms });
  })
);

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.get(
  "/farms/:id",
  wrapAsync(async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate("products");
    if (!farm) throw new AppError("Farm Not Found", 404);
    res.render("farms/show", { farm });
  })
);

app.delete(
  "/farms/:id",
  wrapAsync(async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect("/farms");
  })
);

app.post(
  "/farms",
  wrapAsync(async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    res.redirect("/farms");
  })
);

app.get(
  "/farms/:id/products/new",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    if (!farm) throw new AppError("Farm Not Found", 404);
    res.render("products/new", { categories, farm });
  })
);

app.post(
  "/farms/:id/products",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    if (!farm) throw new AppError("Farm Not Found", 404);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
  })
);

// Product Routes
const categories = ["fruit", "vegetable", "dairy"];

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

app.get(
  "/products",
  wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      res.render("products/index", { products, category });
    } else {
      const products = await Product.find({});
      res.render("products/index", { products, category: "All" });
    }
  })
);

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

app.post(
  "/products",
  wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  })
);

app.get(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate("farm", "name");
    if (!product) throw new AppError("Product Not Found", 404);
    res.render("products/show", { product });
  })
);

app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) throw new AppError("Product Not Found", 404);
    res.render("products/edit", { product, categories });
  })
);

app.put(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/products/${product._id}`);
  })
);

app.delete(
  "/products/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
  })
);

const handleValidationErr = (err) => {
  console.dir(err);
  //In a real app, we would do a lot more here...
  return new AppError(`Validation Failed...${err.message}`, 400);
};

app.use((err, req, res, next) => {
  console.log(err.name);
  //We can single out particular types of Mongoose Errors:
  if (err.name === "ValidationError") err = handleValidationErr(err);
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
