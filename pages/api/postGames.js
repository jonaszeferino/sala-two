import client from '../../mongoConnection';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid'; // Importa a função v4 do módulo uuid

export default async function handler(req, res) {
  console.log('Chamou!');
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { home_club, away_club, date, championship, round } = req.body;

  let createdDate = moment().tz('UTC-03:00').toDate();
  const collection = client.db('sala').collection('games');

  try {
    const document = {
      home_club: home_club,
      away_club: away_club,
      date: date,
      championship: championship,
      created_date: createdDate,
      game_id: uuidv4(),
      final_result_away: null,
      final_result_home: null,
      is_active: 1,
      round: round
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
