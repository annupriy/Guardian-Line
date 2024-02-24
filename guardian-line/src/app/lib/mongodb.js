import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URL
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URL) {
  throw new Error('Add Mongo URI to .env.local')
}
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
export default clientPromise