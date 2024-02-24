import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  const {
    typeOfIncident,
    descriptionOfIncident,
    incidentLocation,
    personalInformation,
    dateOfIncident,
    timeOfIncident,
    city,
    state,
    pincode,
    uploadedDocPath,
    userName,
  } = await req.json();

  try {

    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("ReportsData");

    await collection.insertOne({
      typeOfIncident: typeOfIncident,
      descriptionOfIncident: descriptionOfIncident,
      incidentLocation: incidentLocation,
      personalInformation: personalInformation,
      dateOfIncident: dateOfIncident,
      timeOfIncident: timeOfIncident,
      city: city,
      state: state,
      pincode: pincode,
      uploadedDocPath: uploadedDocPath,
      userName: userName, 
    });
    return new Response("Volunteer registered successfully", { status: 200 });
  } catch (error) {
    console.error("Error adding Report:", error);
    return new Response("Error adding Report", { status: 500 });
  }
}

