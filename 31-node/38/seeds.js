import mongoose from "mongoose";
import Product from "./models/product.js";
import fs from "fs";

mongoose
  .connect("mongodb://localhost:27017/farmStand", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb://localhost:27017/farmStand connected!");
  })
  .catch((err) => {
    console.log(err);
  });

let seedProducts = JSON.parse(fs.readFileSync("./data.json", "utf8"));
seedProducts = seedProducts.sort(() => Math.random() - 0.5);
Product.deleteMany({})
  .then((res) => {
    console.log(res);
    Product.insertMany(seedProducts)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
