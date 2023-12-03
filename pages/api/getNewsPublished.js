import client from '../../mongoConnection';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  try {
    await client.connect();

    let currentDate = moment().tz('UTC-03:00').toDate();

    console.log('Data Atual:', currentDate);

    const newsCollection = client.db('sala').collection('news');
    const publishedNewsCollection = client
      .db('sala')
      .collection('published_news');

    const news = await newsCollection
      .aggregate([
        {
          $lookup: {
            from: 'published_news',
            localField: 'news_id',
            foreignField: 'news_id',
            as: 'published_info',
          },
        },
        {
          $unwind: {
            path: '$published_info',
            preserveNullAndEmptyArrays: true,
          },
        },
        // Adicionando logs para depuração
        { $addFields: { 'published_info.news_id': '$news_id' } },
        {
          $project: {
            _id: 0,
            title: 1,
            'published_info.published_datetime': 1,
            'published_info.published': 1,
            'published_info.news_id': 1,
          },
        },
        {
          $match: {
            // como esta no banco: published_datetime: 2023-11-17T18:55
            // condicao abaixo
            //'published_info.published_datetime': { $lte: currentDate },
            'published_info.published': true,
          },
        },
        { $sort: { created_at: 1 } },
      ])
      .toArray();

    console.log('Resultado após o $lookup:', news);

    res.status(200).json(news);
  } catch (error) {
    console.error('Erro durante a execução:', error);
    res.status(500).json({ error: error.message });
  }
}
//old
