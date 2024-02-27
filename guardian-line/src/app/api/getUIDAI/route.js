import clientPromise from "@/app/lib/mongodb";
// import apiHandler from '../apiHandler';

// import { apiHandler, nextConnect } from '../../../../../pages/api/utils/apiHandler';
// const client = nextConnect(); // Connect to MongoDB using middleware

export async function POST(req) {
    try {
        
        const {body } = await req.json();
        const client=  await clientPromise; // Ensure connection establishment before proceeding
        try {
            const db = client.db('GuardianLine');
            const collection = db.collection('UIDAI');
            // Add filtering/validation based on query parameters if needed
            const { hashedAadharNumber } = body;
            const query = { AadharNum: hashedAadharNumber };

            const UIDAI = await collection.find(query);
            console.log(UIDAI)

           return  new Response((UIDAI.PhoneNum).json, {status:200});
        } catch(error){
            return new Response ({ message: 'InValid Aadhar Number' }, {status : 405}); // Handle unsupported methods
        }
    } catch (error) {
        console.error(error);
        return new Response ({ message: 'Error connecting to MongoDB Atlas' }, {status : 500}); // Provide specific error messages
    } finally {
        await client.close(); // Always close the connection even on errors
    }
}

// export default getUIDAI; // Apply API handler middleware