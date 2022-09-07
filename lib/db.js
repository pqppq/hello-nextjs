import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const uri = "MONGODB_CONNECTION_URI"
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  return client;
}
