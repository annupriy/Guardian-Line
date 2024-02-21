import clientPromise from "@/app/lib/mongodb"

export async function POST() {
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("UIDAI");
    const data = await collection.find({}).toArray();
    console.log(data)
    return Response.json({data: data})
    
  }
  