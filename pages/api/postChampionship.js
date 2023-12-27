import client from '../../mongoConnection';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid'; // Importa a função v4 do módulo uuid

export default async function handler(req, res) {
  console.log('Chamou!');
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { name, season, date } = req.body;

  let createdDate = moment().tz('UTC-03:00').toDate();
  const collection = client.db('sala').collection('championships');

  try {
    const document = {
      name: name,
      season: season,
      date: date,
      championship_id: uuidv4(),
      is_active: 1,
    };
    const result = await collection.insertOne(document);

    if (result.acknowledged) {
      res.status(200).json({ message: 'Insert successful', result });
    } else {
      res.status(500).json({ message: 'Insert failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
