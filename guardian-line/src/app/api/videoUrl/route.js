import clientPromise from "@/app/lib/mongodb";

export async function GET(req) {
  const { reportid } = req.query; // Extracting the reportid from the query parameters

  const client = await clientPromise;
  try {
    const db = await client.db("GuardianLine");
    const collection = db.collection("ReportsData");

    // Find the report based on the reportid
    const presentReportOfUser = await collection.findOne({ reportid: reportid });
    console.log("Hi");

    if (presentReportOfUser) {
      // If the report is found, return it as a response
      return {
        status: 200,
        body: { report: presentReportOfUser }
      };
    } else {
      // If the report is not found, return a 404 error
      return {
        status: 404,
        body: { message: "Report not found" }
      };
    }
  } catch (error) {
    // If an error occurs, return a 500 error
    return {
      status: 500,
      body: { message: "Internal Server Error" }
    };
  }
}
