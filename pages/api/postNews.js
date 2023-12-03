import client from '../../mongoConnection';
import moment from 'moment-timezone';
import { v4 as uuidv4 } from 'uuid'; 

export default async function handler(req, res) {
  console.log("Chamou")
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const { journalist_name, news, title, tags, image_link } = req.body;

  console.log(req.body)

  let date = moment().tz('UTC-03:00').toDate();
  console.log(date)
  const collection = client.db('sala').collection('news');
  try {
    const document = {
      news: news,
      jornalist_name: journalist_name,
      title: title,
      image_link: image_link,
      tags: tags,
      created_at: date,
      news_id: uuidv4(),

    };

    const result = await collection.insertOne(document);

    if (result.acknowledged) {
      res.status(200).json({ message: 'Insert successful', result });
    } else {
      res.status(500).json({ message: 'Insert failed' });
      console.log(res.status)
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    
  }
}
