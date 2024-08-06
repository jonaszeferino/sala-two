import pool from '../../utils/db';
import moment from 'moment-timezone';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    await handlePatch(req, res);
  } else if (req.method === 'POST') {
    await handleInsert(req, res);
  } else if (req.method === 'GET') {
    await handleGet(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function handlePatch(req, res) {
  const { id, is_visible, publicated_date } = req.body;

  try {
    const client = await pool.connect();
    try {
      
      let publicationDate = publicated_date;

      if (!publicationDate) {
        publicationDate = moment().tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ssZ');
      }

      const queryText = `
        UPDATE articles
        SET is_visible = $1, publicated_date = $2
        WHERE id = $3
        RETURNING *;
      `;
      const queryValues = [is_visible, publicationDate, id];

      const result = await client.query(queryText, queryValues);

      if (result.rows.length === 0) {
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.status(200).json(result.rows[0]);
      }
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

// ... other handler functions (handleInsert, handleGet) remain the same
