import clientPromise from "@/app/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userName = searchParams.get("userName");
  // Connect to MongoDB
  const client = await clientPromise;
  const db = client.db("GuardianLine");
  const collection = db.collection("ActiveVolunteers");
  // Check if user exists
  const userExists = await collection.findOne({ userName: userName });
  // Return an object boolean value
  const isPresent = userExists ? true : false;
  return Response.json({ isPresent });
}
