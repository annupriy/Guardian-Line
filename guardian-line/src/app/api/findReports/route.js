// pages/api/reports.js
import clientPromise from "@/app/lib/mongodb";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const userName = searchParams.get("userName");
  const client = await clientPromise;
  try {
    const db = await client.db("GuardianLine");
    const collection = db.collection("ReportsData");
    const reportsData = await collection.find({
      userName: userName,
    });
    const reports = await reportsData.toArray();
    // console.log("reports", reports);
    return Response.json({ reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return Response.error("Internal Server Error' ");
  }
}
