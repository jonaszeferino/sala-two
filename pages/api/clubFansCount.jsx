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

async function handleInsert(req, res) {
  const {
    internacional_count,
    gremio_count,
    other_count,
    fan_identity,
  } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        INSERT INTO club_fans (
          internacional_count,
          gremio_count,
          other_count,
          fan_identity
        ) VALUES ($1, $2, $3, $4)
      `;

      const queryValues = [
        internacional_count,
        gremio_count,
        other_count,
        fan_identity,
      ];

      await client.query(queryText, queryValues);

      await client.query('COMMIT');

      res.status(201).json({ message: 'Fan data inserted successfully' });
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

async function handleUpdate(req, res) {
  const {
    id,
    internacional_count,
    gremio_count,
    other_count,
    fan_identity,
  } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        UPDATE club_fans
        SET
          internacional_count = $2,
          gremio_count = $3,
          other_count = $4,
          fan_identity = $5
        WHERE id = $1
      `;

      const queryValues = [
        id,
        internacional_count,
        gremio_count,
        other_count,
        fan_identity,
      ];

      await client.query(queryText, queryValues);

      await client.query('COMMIT');

      res.status(200).json({ message: 'Fan data updated successfully' });
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

async function handleDelete(req, res) {
  const { id } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        DELETE FROM club_fans
        WHERE id = $1
      `;

      await client.query(queryText, [id]);

      await client.query('COMMIT');

      res.status(200).json({ message: 'Fan data deleted successfully' });
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

async function handleGet(req, res) {
  const { id } = req.query;

  try {
    const client = await pool.connect();
    try {
      let queryText;
      let queryValues;

      if (id) {
        queryText = 'SELECT * FROM club_fans WHERE id = $1';
        queryValues = [parseInt(id, 10)];
      } else {
        queryText = `
          SELECT
              SUM(gremio_count) AS total_gremio,
              SUM(internacional_count) AS total_internacional,
              SUM(other_count) AS total_other,
              COUNT(*) AS total_votos_unicos,
              ROUND(100.0 * SUM(gremio_count) / COUNT(*), 2) AS porcentagem_gremio,
              ROUND(100.0 * SUM(internacional_count) / COUNT(*), 2) AS porcentagem_internacional,
              ROUND(100.0 * SUM(other_count) / COUNT(*), 2) AS porcentagem_other
          FROM (
              SELECT DISTINCT ON (fan_identity) gremio_count, internacional_count, other_count
              FROM club_fans
          ) AS unique_fans;
        `;
        queryValues = [];
      }

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
