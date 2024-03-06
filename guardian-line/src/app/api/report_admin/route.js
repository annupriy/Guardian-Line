import clientPromise from "@/app/lib/mongodb";

export const dynamic = 'force-dynamic'

export async function GET(req) {
    const client = await clientPromise;

    try {

        const db = await client.db("GuardianLine");
        const collection = db.collection("ReportsData");

        const allDocuments = await collection.find({}).toArray();

        return new Response(JSON.stringify(allDocuments));
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return Response.error("error", { status: 401 });
    }
};