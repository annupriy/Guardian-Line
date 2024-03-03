import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  const { reportId } = await req.json();
  console.log("Report Data is being resolved");

  const client = await clientPromise;
  try {
    const db = await client.db("GuardianLine");
    const collection = db.collection("ReportsData");
    await collection.updateOne(
      { reportid: reportId },
      {
        $set: {
          resolved: true,
        },
      }
    );
    return new Response("Report Resolved", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
