import client from "../../mongoConnection";

export default async function handler(req, res) {
  console.log('chegou na api de delecao')
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const {
   news_id
  } = req.body;
  const collection = client.db("sala").collection("news");

  try {
    const filter = { news_id: news_id };
    const result = await collection.deleteOne(filter);
    console.log('achou o arquivo pra deletar')

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Delete successful" });
      console.log('deletou')
    } else {
      res.status(404).json({ message: "No matching document found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
