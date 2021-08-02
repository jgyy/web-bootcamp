import mongoose from "mongoose";
const url = "mongodb://localhost:27017/shopApp";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connection to "${url}" is open.`))
  .catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price needs to be a positive value."],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

productSchema.statics.fireSale = function () {
  return this.updateMany({}, { OnSale: true, price: 0 });
};

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Tire Pump" });
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory("Outdoors");
  console.log(foundProduct);
};
findProduct();
Product.fireSale().then((res) => console.log(res));

const bike = new Product({
  name: "Tire Pump",
  price: 599,
  categories: ["Cycling", "Safety"],
  size: "S",
});
bike
  .save()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
Product.findOneAndUpdate(
  { name: "Tire Pump" },
  { price: 100 },
  { new: true, runValidators: true }
)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
