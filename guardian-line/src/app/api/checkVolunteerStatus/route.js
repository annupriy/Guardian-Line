import clientPromise from "@/app/lib/mongodb";
export const dynamic = 'force-dynamic'
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userName = searchParams.get("userName");
  
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("ActiveVolunteers");
    
    // Check if user exists
    const userExists = await collection.findOne({ userName: userName });
    
    // Return an object with a boolean value indicating whether the user is present
    const isPresent = !!userExists;
    
    return Response.json({ isPresent });
  } catch (error) {
    console.error("Error:", error);
    return Response.error("Error checking if volunteer is active");
  }
}
