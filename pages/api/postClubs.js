import client from "../../mongoConnection";
import moment from "moment-timezone";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { club_name, logo_name } = req.body;

  let date = moment().tz("UTC-03:00").toDate();
  const collection = client.db("sala").collection("clubs");

  try {
    const document = {
      club_name: club_name,
      logo_name: logo_name,
      created_at: date,
    };

    const result = await collection.insertOne(document);

    if (result.acknowledged) {
      res.status(200).json({ message: "Insert successful", result });
    } else {
      res.status(500).json({ message: "Insert failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
