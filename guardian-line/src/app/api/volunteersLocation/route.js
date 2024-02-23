import clientPromise from "@/app/lib/mongodb";
import { use } from "react";

export async function POST(req) {
  try {
    const {userName, latitude, longitude, accuracy} = await req.json()
    // Connect to MongoDB
    console.log("username", userName);
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("ActiveVolunteers");

    // CHeck if user already exists
    const userExists = await collection.findOne({ userName:userName });
    if (userExists) {
      console.log("User already exists");
      return new Response("User already exists", { status: 200 });
    }
    const result = await collection.insertOne({ userName: userName, latitude: latitude, longitude: longitude, accuracy: accuracy, timestamp: 0});

    // Respond with success message
    console.log("Location added successfully");
    console.log(result);
    return new Response("Location fetched successfully" ,{ status: 200 });
  } catch (error) {
    // Handle errors
    console.error("Error adding location:", error);
    return new Response("Error fetching location", { status: 500 });
  }
}
