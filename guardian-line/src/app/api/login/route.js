import clientPromise from "@/app/lib/mongodb"

export async function GET() {
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("users");
    // find a username in the database
    const username = await collection.find()
    const data = await collection.find({}).toArray();
    console.log(data)
    return Response.json({data: data})
    
}
  