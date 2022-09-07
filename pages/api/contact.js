import { MongoClient, ServerApiVersion } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input." });
      return;
    }

    // store it in database
    const newMessage = {
      email,
      name,
      message,
    };
    console.log(newMessage);

    const uri =
      "MONGODB_CONNECTION_URI";

    let client;
    try {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
      });
      await client.connect();
    } catch (error) {
      res.status(500).json({ message: "Could not connect database." });
      return;
    }

    try {
      const db = client.db();
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing data failed!" });
      return;
    }

    client.close();
    res.status(201).json({ message: "Successfully stored data!" });
  }
}

export default handler;
