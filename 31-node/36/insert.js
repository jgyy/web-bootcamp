import { MongoClient } from "mongodb";
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

import fs from "fs";
// create an array of documents to insert
let txs = JSON.parse(fs.readFileSync("./data.json", "utf8")).txs;

async function run() {
  try {
    await client.connect();
    const database = client.db("blockchain");
    const bitcoin = database.collection("bitcoin");

    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await bitcoin.insertMany(txs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
