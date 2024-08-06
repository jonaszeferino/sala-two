import pool from '../../utils/db';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await handleInsert(req, res);
  } else if (req.method === 'GET') {
    await handleGet(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function handleGet(req, res) {
  const { id } = req.query;

  try {
    const client = await pool.connect();
    try {
      const currentBrazilTime = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
      const currentUTC = moment.utc(currentBrazilTime).format('YYYY-MM-DD HH:mm:ss');

      let queryText = 'SELECT * FROM articles WHERE publicated_date > $1 AND is_visible = true';
      const queryValues = [currentUTC];

      if (id) {
        queryText += ' AND id = $2';
        queryValues.push(parseInt(id, 10));
      }

      queryText += ' ORDER BY publicated_date DESC';

      const result = await client.query(queryText, queryValues);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: error.message || 'Unknown error' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
}
