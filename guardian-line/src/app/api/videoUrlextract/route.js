import clientPromise from "@/app/lib/mongodb";
export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const reportid = searchParams.get("reportid");

  try {
    const client = await clientPromise;
    const db = client.db("GuardianLine");
    const collection = db.collection("ReportsData");
    const presentReportOfUser = await collection.findOne({ reportid: reportid });
    
    // if (presentReportOfUser) {
        const uploadedDocPath = presentReportOfUser.uploadedDocPath;
        // Now you can use the uploadedDocPath
        console.log("Uploaded Doc Path:", uploadedDocPath);
        
        // Send response with the uploadedDocPath
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ uploadedDocPath }));
    //   } else {
    //     // Report not found
    //     res.writeHead(404, { "Content-Type": "application/json" });
    //     res.end(JSON.stringify({ message: "Report not found" }));
    //   }
    
  } catch (error) {
    console.error("Error:", error);
    return Response.error("Error fetching url");
  }
}