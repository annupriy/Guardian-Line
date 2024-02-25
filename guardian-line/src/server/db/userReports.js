import clientPromise from "@/app/lib/mongodb";

export async function hasReported(userName) {
  const client = await clientPromise;
  try {
    // Connect to MongoDB
    const db = await client.db("GuardianLine");
    const collection = db.collection("ReportsData");
    // Check if the volunteer is already registered
    const hasFiledReports = await collection.findOne({
      userName: userName,
    });
    return hasFiledReports;
  } catch (error) {
    // Handle errors
    console.error("Error checking if user has filed any reports:", error);
    return null;
  }
  finally {
    await client.close();
  }
}
