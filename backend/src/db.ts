import { MongoClient } from 'mongodb'

const connectionString = process.env.MONGO_CONNECTION || "mongodb://127.0.0.1:27017"

const client = new MongoClient(connectionString)

const connection = client.connect();

export default async () => {
  return (await connection).db("timesheets")
}
