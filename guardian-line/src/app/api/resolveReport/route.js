import clientPromise from "@/app/lib/mongodb";
export const dynamic = 'force-dynamic'
export async function POST(req) {
  const { reportId, statement,incidentType,userStatus } = await req.json();
  console.log("Report Data is being resolved");
  const client = await clientPromise;
  try {
    const db = await client.db("GuardianLine");
    const collection = db.collection("ReportsData");
    const userCollection = db.collection("Users");
    const report = await collection.findOne({ reportid: reportId });
    await collection.updateOne(
      { reportid: reportId },
      {
        $set: {
          resolved: true,
          adminStatement: statement,
        },
      }
    );
    if (report) {
      console.log(incidentType, userStatus, statement);
      const username = report.userName;
      let ct = 0;
      if(userStatus === "victim"){
        if(incidentType === "Harassment"){
          ct = statement ? 1 : -0.5;
        }
        else{
          ct = statement ? 1 : -1.5;
        }
      }
      else{
        if(incidentType === "Harassment"){
          ct = statement ? 1 : -0.5;
        }
        else{
          ct = statement ? 1 : -1;
        }
      }
      console.log("CT", ct);
      await userCollection.updateOne(
        { userName: username },
        {
          $inc: { reputation: ct },
        }
      );

      // Volunteers point distribution

      const votedTrue = report.votedTrue;
      const votedFalse = report.votedFalse;
      console.log("Voted True", votedTrue);
      console.log("Voted False", votedFalse);
      // Update the reputation of the volunteers who voted True by incrememnting 1 if the statement is true
      ct = statement ? 1 : -1;
      if (votedTrue && votedTrue.length > 0) {
        await userCollection.updateMany(
          { userName: { $in: votedTrue } },
          {
            $inc: { reputation: ct },
          }
        );
      }
      if (votedFalse && votedFalse.length > 0) {
        await userCollection.updateMany(
          { userName: { $in: votedFalse } },
          {
            $inc: { reputation: -ct },
          }
        );
      }
    }
    return new Response("Report Resolved", { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
