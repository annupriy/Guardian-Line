import clientPromise from "@/app/lib/mongodb";

export async function isRegistered(userName) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("Volunteers");
    // Check if the volunteer is already registered
    const isAlreadyRegistered = await collection.findOne({
      userName: userName,
    });
    return isAlreadyRegistered;
  } catch (error) {
    // Handle errors
    console.error("Error checking if volunteer is registered:", error);
    return null;
  }
}
