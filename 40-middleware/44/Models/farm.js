import mongoose from "mongoose";
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
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

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
await Product.deleteMany({});
const Farm = mongoose.model("Farm", farmSchema);
await Farm.deleteMany({});

const makeProduct = async () => {
  const product = await Product.insertMany([
    { name: "Goddess Melon", price: 4.99, season: "Summer" },
    { name: "Sugar Baby Watermelon", price: 4.99, season: "Summer" },
    { name: "Asparagus", price: 3.99, season: "Spring" },
  ]);
  console.log(product);
};

const makeFarm = async () => {
  const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
  const melon = await Product.findOne({ name: "Goddess Melon" });
  farm.products.push(melon);
  await farm.save();
  console.log(farm);
};

const addProduct = async () => {
  const farmFind = await Farm.findOne({ name: "Full Belly Farms" });
  const watermelon = await Product.findOne({ name: "Sugar Baby Watermelon" });
  farmFind.products.push(watermelon);
  await farmFind.save();
  console.log(farmFind);
};

await makeProduct();
await makeFarm();
await addProduct();

await Farm.findOne({ name: "Full Belly Farms" })
  .populate("products")
  .then((farm) => console.log(farm));

mongoose.connection.close();
