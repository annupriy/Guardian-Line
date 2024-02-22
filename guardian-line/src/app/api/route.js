const { MongoClient } = require('mongodb');

// MongoDB connection URI (replace with your actual credentials)
const uri = 'mongodb+srv://guardianLine:wdeTUf95gubA33IR@cluster0.xi4kzxw.mongodb.net/';

// Create a new MongoClient instance
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Connect to the MongoDB Atlas cluster
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas cluster!');

        // Create a new database named `contactdb` if it doesn't exist
        const db = client.db('GuardianLine');
        // await db.createCollection('UIDAI'); // Create the collection
        // await db.createCollection('Users'); // Create the collection
        // await db.createCollection('Volunteers'); // Create the collection
        // await db.createCollection('Reports'); // Create the collection

        // Insert new data into the "UIDAI" collection
        const docsUIDAI = [
            {Aadharnumber: '123456789012',
            phonenumber: '9636984353'},
            {Aadharnumber: '234567890123',
            phonenumber: '8847583701'},
            {Aadharnumber: '345678901234',
            phonenumber: '9818126297'},
            {Aadharnumber: '456789012345',
            phonenumber: '9471432980'},
            {Aadharnumber: '567890123456',
            phonenumber: '1234578900'},
        ];
        await db.collection('UIDAI').insertMany(docsUIDAI);
        console.log(`Inserted document`);

    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    } finally {
        // Close the connection to MongoDB Atlas
        await client.close();
    }
}

// Call the connectToDatabase function to start the process
connectToDatabase();