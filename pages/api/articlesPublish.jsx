import pool from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await handleInsert(req, res);
  } else if (req.method === 'PATCH') {
    await handleUpdate(req, res);
  } else if (req.method === 'DELETE') {
    await handleDelete(req, res);
  } else if (req.method === 'GET') {
    await handleGet(req, res);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function handleUpdate(req, res) {
  const { id, is_visible, publicated_date } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        UPDATE articles
        SET
          is_visible = $2,
          publicated_date = $3
        WHERE id = $1
      `;

      const queryValues = [
        id,
        is_visible,
        publicated_date,
      ];

      await client.query(queryText, queryValues);

      await client.query('COMMIT');

      res.status(200).json({ message: 'Article updated successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
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


