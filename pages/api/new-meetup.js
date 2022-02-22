import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    //get request
    const data = req.body;

    //const { title, image, address, description } = data;

    //store data to the database
    const client = await MongoClient.connect(
     'mongodb+srv://mongodb_na:PukfZ7cXkAt6bz8d@cluster0.pnqdh.mongodb.net/meetups?retryWrites=true&w=majority' 
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
