import clientPromise from "@/app/lib/mongodb";

export async function checkVolunteerStatus(userName) {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("ActiveVolunteers");
    // Check if the volunteer is already active
    const isVolunteerActive = await collection.findOne({
      userName: userName,
    });
    return isVolunteerActive;
  } catch (error) {
    // Handle errors
    console.error("Error checking if volunteer is registered:", error);
    return null;
  }
}
