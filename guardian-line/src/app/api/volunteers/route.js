import clientPromise from "@/app/lib/mongodb";
export const dynamic = 'force-dynamic'
export async function POST(req) {
  const client = await clientPromise;
  try {
    const {userName} = await req.json()
    // Connect to MongoDB
    console.log("username", userName);
    const db = await client.db("GuardianLine");
    const collection = db.collection("Volunteers");

    // Insert the volunteer into the collection
    const isAlreadyRegistered = await collection.findOne({ userName: userName });
    if (isAlreadyRegistered) {
      console.log("Volunteer already registered");
      return new Response("Volunteer already registered", { status: 400 });
    }
    
    const result = await collection.insertOne({ userName: userName });

    // Respond with success message
    console.log("Volunteer registered successfully");
    return new Response("Volunteer registered successfully" ,{ status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error registering volunteer:", error);
    return new Response("Error registering volunteer", { status: 500 });
  }
  finally {
    // await client.close();
  }
}
