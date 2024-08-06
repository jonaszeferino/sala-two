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
      // Obter a data atual no fuso horário de São Paulo e formatá-la para 'YYYY-MM-DD HH:mm:ss+00'
      const currentBrazilTime = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss+00');
      console.log('Current Brazil Time:', currentBrazilTime);

      // Construir a query
      let queryText = 'SELECT * FROM articles WHERE publicated_date < $1 AND is_visible = true';
      const queryValues = [currentBrazilTime];

      if (id) {
        queryText += ' AND id = $2';
        queryValues.push(parseInt(id, 10));
      }

      queryText += ' ORDER BY publicated_date DESC';

      console.log('Executing query:', queryText, 'with values:', queryValues);

      // Executar a query
      const result = await client.query(queryText, queryValues);

      console.log('Query result:', result.rows);

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: error.message || 'Unknown error' });
    } finally {
      try {
        client.release();
      } catch (releaseError) {
        console.error('Error releasing client back to pool:', releaseError);
        res.status(500).json({ error: 'Failed to release database client.' });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Unknown error' });
  }
}

