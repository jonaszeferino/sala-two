import client from '../../mongoConnection';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const collection = client.db('sala').collection('championships');
  try {
    await client.connect();

    const collection = client.db('sala').collection('championships');
    const news = await collection.find({}).sort({ created_at: 1 }).toArray();

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
