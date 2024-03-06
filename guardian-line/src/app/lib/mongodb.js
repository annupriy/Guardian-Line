import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;

let client;
let clientPromise;

if (!process.env.MONGODB_URL) {
  throw new Error("Add Mongo URI to .env.local");
}

client = new MongoClient(uri);
clientPromise = client.connect();
export default clientPromise;
