import { MongoClient } from "mongodb";
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("blockchain");
    const bitcoin = database.collection("bitcoin");

    const query = { num_comments: 2 };

    const result = await bitcoin.deleteMany(query);
    console.log("Deleted " + result.deletedCount + " documents");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
