import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  const client = await clientPromise;
  try {
    const { addVolunteer, userName, latitude, longitude, accuracy } =
      await req.json();
    // Connect to MongoDB
    const db = await client.db("GuardianLine");
    const collection = db.collection("ActiveVolunteers");
    if (addVolunteer === false) {
      // Delete the user from the active volunteers
      await collection.findOneAndDelete({ userName: userName });
      console.log("User deleted successfully");
      return new Response("User deleted successfully", { status: 200 });
    } else {
      // CHeck if user already exists
      const userExists = await collection.findOne({ userName: userName });
      if (userExists) {
        console.log("User already exists");
        return new Response("User already exists", { status: 200 });
      }
      await collection.insertOne({
        userName: userName,
        latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
        dateTime: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      });

      // Respond with success message
      console.log("Location added successfully");
      return new Response("Location fetched successfully", { status: 200 });
    }
  } catch (error) {
    // Handle errors
    console.error("Error adding location:", error);
    return new Response("Error fetching location", { status: 500 });
  }
  finally {
    // await client.close();
  }
}
