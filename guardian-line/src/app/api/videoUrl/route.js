import clientPromise from "@/app/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const reportid = searchParams.get("reportid");

  const client = await clientPromise;
  try {
    const db = await client.db("GuardianLine");
    const collection = db.collection("ReportsData");

    // Find the report based on the reportid
    const presentReportOfUser = await collection.findOne({ reportid: reportid });

    if (presentReportOfUser) {
      // If the report is found, return it as a response
      return Response.json(presentReportOfUser);
    } else {
      // If the report is not found, return a 404 error
      return Response.error({ message: "Report not found" });
    }
  } catch (error) {
    // If an error occurs, return a 500 error
    return Response.error({ message: "Internal Server Error" });
  }
}
