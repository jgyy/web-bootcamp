import mongoose from "mongoose";
import Product from "./product.js";
const Schema = mongoose.Schema;
const model = mongoose.model;

const farmSchema = new Schema({
  name: {
    type: String,
    required: [true, "Farm must have a name!"],
  },
  city: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email required!"],
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

farmSchema.post("findOneAndDelete", async function (farm) {
  if (farm.products.length) await Product.deleteMany({ _id: farm.products });
});

const Farm = new model("Farm", farmSchema);
export default Farm;
