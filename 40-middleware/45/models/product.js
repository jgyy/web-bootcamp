import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "name cannot be blank"],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    lowercase: true,
    enum: ["fruit", "vegetable", "dairy"],
  },
  farm: {
    type: Schema.Types.ObjectId,
    ref: "Farm",
  },
});

const Product = new model("Product", productSchema);
export default Product;
