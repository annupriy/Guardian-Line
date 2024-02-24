import clientPromise from "@/app/lib/mongodb";

export async function POST(req){
    const {
        typeOfIncident,
        descriptionOfIncident,
        incidentLocation,
        personalInformation,
        dateOfIncident,
        timeOfIncident,
        city,
        state,
        pincode} = await req.json();

        try{
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
                pincode: pincode
              });
              return new Response("Volunteer registered successfully" ,{ status: 200 });
        } catch(error){
            console.error("Error adding Report:", error);
            return new Response("Error adding Report" ,{ status: 500 });
        }
    };



//     import clientPromise from "@/app/lib/mongodb";

// export async function POST(req) {
//   try {
//     const { addVolunteer, userName, latitude, longitude, accuracy } =
//       await req.json();
//     // Connect to MongoDB
//     const client = await clientPromise;
//     const db = client.db("GuardianLine");
//     const collection = db.collection("ActiveVolunteers");
//     if (addVolunteer === false) {
//       // Delete the user from the active volunteers
//       await collection.findOneAndDelete({ userName: userName });
//       console.log("User deleted successfully");
//       return new Response("User deleted successfully", { status: 200 });
//     } else {
//       // CHeck if user already exists
//       const userExists = await collection.findOne({ userName: userName });
//       if (userExists) {
//         console.log("User already exists");
//         return new Response("User already exists", { status: 200 });
//       }
//       await collection.insertOne({
//         userName: userName,
//         latitude: latitude,
//         longitude: longitude,
//         accuracy: accuracy,
//         dateTime: new Date().toLocaleString("en-US", {
//           timeZone: "Asia/Kolkata",
//         }),
//       });

//       // Respond with success message
//       console.log("Location added successfully");
//       return new Response("Location fetched successfully", { status: 200 });
//     }
//   } catch (error) {
//     // Handle errors
//     console.error("Error adding location:", error);
//     return new Response("Error fetching location", { status: 500 });
//   }
// }

// }