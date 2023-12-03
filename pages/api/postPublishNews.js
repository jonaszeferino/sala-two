import client from '../../mongoConnection';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  console.log('Chamou');


  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const {
    published,
    publish_datetime,
    news_id,
  } = req.body;
  
  console.log(req.body)


  let date = moment().tz('UTC-03:00').toDate();
  const collection = client.db('sala').collection('published_news');
  try {
    const document = {
      created_at: date,
      publish_datetime: publish_datetime,
      news_id: news_id,
      published: published,
      news_published_id: uuidv4(),
    };

    const result = await collection.insertOne(document);

    if (result.acknowledged) {
      res.status(200).json({ message: 'Insert successful', result });
    } else {
      res.status(500).json({ message: 'Insert failed' });
      console.log(res.status);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
