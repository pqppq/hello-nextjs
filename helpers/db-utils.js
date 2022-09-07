import { MongoClient } from "mongodb";

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  console.log("all documents =>", documents);
  return documents;
}

export async function connectDatabase() {
  const uri = "MONGODU_CONNECITON_URI"
  const client = await MongoClient.connect(uri);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}
