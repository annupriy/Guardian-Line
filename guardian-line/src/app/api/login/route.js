import clientPromise from "@/app/lib/mongodb"

export async function GET() {
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("Users");
    // write code to match the user's username and password with the database

    console.log(data)
    return Response.json({data: data})
  }