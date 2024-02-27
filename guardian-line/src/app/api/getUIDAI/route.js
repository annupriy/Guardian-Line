import clientPromise from "@/app/lib/mongodb";




export async function GET(req) {
    console.log("hello")
    const { searchParams } = new URL(req.url);
    const hashedAadharNumber = searchParams.get("hashedAadharNumber")
    try {
        // Connect to MongoDB
        const client = await clientPromise;
        const db = client.db("GuardianLine");
        const collection = db.collection("UIDAI");
        
        // Check if user exists
        const AadharExists = await collection.findOne({ AadharNum: hashedAadharNumber});
        
        // Return phoneNum of that corresponding aadhar number
        if(AadharExists){
        const phoneNum = AadharExists.PhoneNum;
        return Response.json({ phoneNum });
        }
        return Response.json("InValid Aadhar Number");
      } catch (error) {
        console.error("Error:", error);
        return Response.error("Error checking if Aadhar is present");
      }
    };

   