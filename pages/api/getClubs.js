import client from "../../mongoConnection";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const collection = client.db("sala").collection("clubs");

  try {

    const clubs = await collection.find({}).sort({ club_name: 1 }).toArray();


    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
