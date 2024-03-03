import clientPromise from "@/app/lib/mongodb";
import { stat } from "fs";

export async function GET(req) {
    const client = await clientPromise;
    const { searchParams } = new URL(req.url);
    const reportid = searchParams.get("reportid");



    try {

        const db = await client.db("GuardianLine");
        const collection = db.collection("ReportsData");

        if(!req.url){
            return new Response("Report does not exist", { status: 400 });
        }

        const report = await collection.findOne({ 
            reportid: reportid});

        if(report){
            return new Response(JSON.stringify({ report }), { status: 200 });
        }

        return new Response("Invalid Report ID", { status: 401 });
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return Response.error("error", { status: 401 });
    }
};