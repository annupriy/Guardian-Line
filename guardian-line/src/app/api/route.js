import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URL;
// Create a new MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export const dynamic = 'force-dynamic'
// Connect to the MongoDB Atlas cluster
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas cluster!");

    // Create a new database named `contactdb` if it doesn't exist
    const db = await client.db("GuardianLine");
    console.log(`Inserted document`);
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {
    // Close the connection to MongoDB Atlas
    // await client.close();
  }
}

// Call the connectToDatabase function to start the process
connectToDatabase();
