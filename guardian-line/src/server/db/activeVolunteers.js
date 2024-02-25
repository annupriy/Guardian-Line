import clientPromise from "@/app/lib/mongodb";

export async function addActiveVolunteer(userName) {
  const client = await clientPromise;
  try {
    // Connect to MongoDB
    const db = await client.db("GuardianLine");
    const collection = db.collection("ActiveVolunteers");

    // Add the volunteer to the active volunteers collection
    await collection.insertOne({
      userName: userName,
      activeCrimes: [],
      // You can add additional fields here if needed
    });

    console.log("Volunteer added to active volunteers successfully");
    return true; // Indicate success
  } catch (error) {
    // Handle errors
    console.error("Error adding volunteer to active volunteers:", error);
    return false; // Indicate failure
  }
  // finally {
  //   await client.close();
  // }
}

