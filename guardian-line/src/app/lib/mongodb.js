import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;

let client;
let clientPromise;

if (!process.env.MONGODB_URL) {
  throw new Error("Add Mongo URI to .env.local");
}

if (!global._clientPromise) {
  console.log("Creating new client");
  client = new MongoClient(uri);
  global._clientPromise = client.connect();
}
clientPromise = global._clientPromise;
export default clientPromise;
