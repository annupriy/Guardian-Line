import clientPromise from "@/app/lib/mongodb";
export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const userName = searchParams.get("userName");

  try {
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("ActiveVolunteers");
    const volunteerLiveData = await collection.findOne({ userName: userName });
    if (!volunteerLiveData) {
      return new Response("Volunteer not found", { status: 500 });
    }
    if (!volunteerLiveData.activeCrimes) {
      return new Response("No active crimes", { status: 200 });
    }
    let crimesAround = await volunteerLiveData.activeCrimes;
    // Return only those crimesAround which has type of incident as not Harassment
    crimesAround = crimesAround.filter(
      (crime) => (crime.typeOfIncident !== "Harassment" && crime.status === "Live")
    );
    // Return the active crimes array
    return Response.json({ crimesAround });
  } catch (error) {
    console.error("Error:", error);
    return Response.error("Error fetching active crimes");
  }
}
