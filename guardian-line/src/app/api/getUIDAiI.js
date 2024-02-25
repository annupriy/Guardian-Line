import { MongoClient } from 'mongodb';
import { apiHandler, nextConnect } from '../../../pages/api/utils/apiUtils'; // Updated import path

const client = nextConnect(); // Connect to MongoDB using middleware

async function getUIDAI(req, res) {
    try {
        await client.connect(); // Ensure connection establishment before proceeding

        const { method, body } = req;
console.log('inside1')
        if (method === 'POST') {
            const db = client.db('GuardianLine');
            const collection = db.collection('UIDAI');
            console.log('inside')
            // Add filtering/validation based on query parameters if needed
            const { hashedAadharNumber } = body;
            const query = { AadharNum: hashedAadharNumber };

            const UIDAI = await collection.find(query);
            console.log(UIDAI)

            res.status(200).json(UIDAI.PhoneNum);
        } else {
            res.status(405).json({ message: 'InValid Aadhar Number' }); // Handle unsupported methods
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error connecting to MongoDB Atlas' }); // Provide specific error messages
     } 
    // finally {
    //     await client.close(); // Always close the connection even on errors
    // }
}

export default apiHandler(getUIDAI); // Apply API handler middleware