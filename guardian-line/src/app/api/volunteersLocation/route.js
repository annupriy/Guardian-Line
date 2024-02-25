import clientPromise from "@/app/lib/mongodb";

// Define getDistance function
function getDistance(lat1, lon1, lat2, lon2) {
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const R = 6371; // Radius of the earth in kilometers
  const dLat = deg2rad(lat2 - lat1); // Convert degrees to radians
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

export async function POST(req) {
  const client = await clientPromise;
  try {
    const { addVolunteer, userName, latitude, longitude, accuracy } =
      await req.json();
    // Connect to MongoDB
    const db = await client.db("GuardianLine");
    const collection = db.collection("ActiveVolunteers");
    const volunteersAroundCollection = db.collection("VolunteersAround");
    if (addVolunteer === false) {
      // Delete the user from the active volunteers
      await collection.findOneAndDelete({ userName: userName });
      // Remove the user from VolunteersAround collection as well
      await volunteersAroundCollection.updateMany(
        { "volunteers.userName": userName },
        { $pull: { volunteers: { userName } } }
      );
      console.log("User deleted successfully");
      return new Response("User deleted successfully", { status: 200 });
    } else {
      // Check if user already exists
      const userExists = await collection.findOne({ userName: userName });
      if (userExists) {
        console.log("User already exists");
        return new Response("User already exists", { status: 200 });
      }

      // Find nearby reports
      const reportsCollection = db.collection("ReportsData");
      const reports = await reportsCollection
        .find({ "incidentLocation.latitude": { $exists: true } })
        .toArray();

      // Filter reports with longitude and latitude at a distance of 2km from the volunteer
      const reportsNearby = reports
        .map((report) => {
          const distance = getDistance(
            report.incidentLocation.latitude,
            report.incidentLocation.longitude,
            latitude,
            longitude
          );
          return { ...report, distance: distance };
        })
        .filter((report) => report.distance <= 2);

      for (const report of reportsNearby) {
        await volunteersAroundCollection.updateOne(
          { userName: report.userName },
          {
            $addToSet: {
              volunteers: {
                userName: userName,
                distance: report.distance,
              },
            },
          },
          { upsert: true }
        );
      }

      const activeCrimesNear = reportsNearby.map((report) => {
        return {
          userName: report.userName,
          incidentLocation: report.incidentLocation,
          distance: report.distance,
          typeOfIncident: report.typeOfIncident,
          descriptionOfIncident: report.descriptionOfIncident,
          timeOfIncident: report.timeOfIncident,
          personalInformation: report.personalInformation,
        };
      });

      await collection.insertOne({
        userName: userName,
        latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
        dateTime: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
        activeCrimes: activeCrimesNear,
      });

      // Respond with success message
      console.log("Location added successfully");
      return new Response("Location added successfully", { status: 200 });
    }
  } catch (error) {
    // Handle errors
    console.error("Error adding location:", error);
    return new Response("Error adding location", { status: 500 });
  } finally {
    // Close the database connection
    // await client.close();
  }
}
