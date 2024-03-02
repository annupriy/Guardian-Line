import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URL) {
  throw new Error("Add Mongo URI to .env.local");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._clientPromise = client.connect();
}
clientPromise = global._clientPromise;
export default clientPromise;
