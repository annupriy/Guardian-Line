import clientPromise from "@/app/lib/mongodb";
import { getServerAuthSession } from "@/server/auth";

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
    const {
      addVolunteer,
      userName,
      latitude,
      longitude,
      accuracy,
      removeReport,
      reportid,
      vote,
      getUserReputation,
    } = await req.json();
    // Connect to MongoDB
    const db = await client.db("GuardianLine");
    const authSession = await getServerAuthSession();
    const name = authSession?.user?.name;
    const collection = db.collection("ActiveVolunteers");
    const volunteersAroundCollection = db.collection("VolunteersAround");
    if (addVolunteer === false) {
      // Delete the user from the active volunteers
      await collection.findOneAndDelete({ userName: userName });
      // Remove the user from VolunteersAround collection as well
      const allVolunteersAround = await volunteersAroundCollection
        .find()
        .toArray();
      for (const volunteer of allVolunteersAround) {
        if (volunteer.volunteers.length > 0) {
          let indx = [];
          volunteer.volunteers.map((vol, idx) => {
            if (vol.userName === userName) {
              indx.push(idx);
            }
          });
          if (indx.length > 0) {
            for (const i of indx) {
              volunteer.volunteers.splice(i, 1);
              await volunteersAroundCollection.updateOne(
                { userName: volunteer.userName },
                { $set: { volunteers: volunteer.volunteers } },
                { upsert: true }
              );
            }
          }
        }
      }

      console.log("User deleted successfully");
      return new Response("User deleted successfully", { status: 200 });
    } else if (removeReport === true && vote === 0) {
      // Remove the report from the active crimes array that has the reportid
      // Find the index of the report in the active crimes array where reportid matches
      const document = await collection.findOne({ userName: name });

      if (document) {
        // Give an array which contains objects and the one of the object has reportid as value find the index of the object
        document.activeCrimes.map((crime, idx) => {
          if (crime.reportid === reportid) {
            console.log("Index of the matching element:", idx);
            document.activeCrimes.splice(idx, 1);
          }
        });
        await collection.updateOne(
          { userName: name },
          { $set: { activeCrimes: document.activeCrimes } }
        );
      } else {
        console.log("Document not found for userName:", name);
      }
      return new Response("Report removed successfully", { status: 200 });
    } else if (removeReport === true && vote !== 0) {
      const reportsCollection = db.collection("ReportsData");
      const document2 = await reportsCollection.findOne({ reportid: reportid });
      if (document2) {
        if (vote >= 1) {
          await reportsCollection.updateOne(
            { reportid: reportid },
            {
              $set: { vote: (document2.vote || 0) + vote },
              $addToSet: {
                votedTrue: name,
              },
            },
            { upsert: true }
          );
        } else if (vote <= -1) {
          await reportsCollection.updateOne(
            { reportid: reportid },
            {
              $set: { vote: (document2.vote || 0) + vote },
              $addToSet: {
                votedFalse: name,
              },
            },
            { upsert: true }
          );
        }
      } else {
        console.log(
          "Report validation didn't summed up for reportid:",
          reportid
        );
      }
      const document = await collection.findOne({ userName: name });
      if (document) {
        // Give an array which contains objects and the one of the object has reportid as value find the index of the object
        document.activeCrimes.map((crime, idx) => {
          if (crime.reportid === reportid) {
            console.log("Index of the matching element:", idx);
            document.activeCrimes.splice(idx, 1);
          }
        });
        await collection.updateOne(
          { userName: name },
          { $set: { activeCrimes: document.activeCrimes } },
          { upsert: true }
        );
      } else {
        console.log("Document not found for userName:", name);
      }

      return new Response("Report validated successfully", { status: 200 });
    } else if (getUserReputation === true) {
      const userCollection = db.collection("Users");

      const user = await userCollection.findOne({ userName: name });
      if (user) {
        console.log("User found", user.reputation);
        return new Response(user.reputation, { status: 200 });
      } else {
        console.log("User not found");
        return new Response("User not found", { status: 200 });
      }
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
        .find({ status: "Live" })
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
      // remove those reports which have same username as report.username
      // create an empty set
      let s = new Set();
      for (let i = reportsNearby.length - 1; i >= 0; i--) {
        if (s.has(reportsNearby[i].userName)) {
          reportsNearby.splice(i, 1);
        } else {
          s.add(reportsNearby[i].userName);
        }
      }
      console.log("Reports Nearby", reportsNearby);
      for (const report of reportsNearby) {
        await volunteersAroundCollection.updateOne(
          { userName: report.userName },
          {
            $addToSet: {
              volunteers: { userName: userName, distance: report.distance },
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
          filingtime: report.filingtime,
          personalInformation: report.personalInformation,
          reportid: report.reportid,
          status: report.status,
        };
      });

      await collection.updateOne(
        {
          userName: userName,
          latitude: latitude,
          longitude: longitude,
          accuracy: accuracy,
          dateTime: new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          }),
          activeCrimes: activeCrimesNear,
        },
        {
          $set: {
            userName: userName,
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
            dateTime: new Date().toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            }),
            activeCrimes: activeCrimesNear,
          },
        },
        { upsert: true }
      );

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
