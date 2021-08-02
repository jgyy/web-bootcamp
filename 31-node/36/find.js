import { MongoClient } from "mongodb";
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("blockchain");
    const bitcoin = database.collection("bitcoin");

    const query = { ver: { $lt: 3 } };
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { hash: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: { _id: 0, inputs: 1, out: 1 },
    };
    const cursor = bitcoin.find(query, options);
    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }
    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
