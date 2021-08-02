import { MongoClient } from "mongodb";
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("blockchain");
    const bitcoin = database.collection("bitcoin");

    const filter = { ver: 2 };

    // increment every document matching the filter with 2 more comments
    const updateDoc = {
      $inc: {
        num_comments: 2,
      },
    };
    const result = await bitcoin.updateMany(filter, updateDoc);
    console.log(result);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
