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
    home_team,
    away_team,
    match_time,
    stadium,
    score_home_team,
    score_away_team,
    winner,
    is_deleted,
    is_visible,
  } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        INSERT INTO games (
          home_team,
          away_team,
          match_time,
          stadium,
          score_home_team,
          score_away_team,
          winner,
          is_deleted,
          is_visible
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `;

      const queryValues = [
        home_team,
        away_team,
        match_time,
        stadium,
        score_home_team,
        score_away_team,
        winner,
        is_deleted,
        is_visible,
      ];

      await client.query(queryText, queryValues);

      await client.query('COMMIT');

      res.status(201).json({ message: 'Game inserted successfully' });
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
    home_team,
    away_team,
    match_time,
    stadium,
    score_home_team,
    score_away_team,
    winner,
    is_deleted,
    is_visible,
  } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        UPDATE games
        SET
          home_team = $2,
          away_team = $3,
          match_time = $4,
          stadium = $5,
          score_home_team = $6,
          score_away_team = $7,
          winner = $8,
          is_deleted = $9,
          is_visible = $10
        WHERE id = $1
      `;

      const queryValues = [
        id,
        home_team,
        away_team,
        match_time,
        stadium,
        score_home_team,
        score_away_team,
        winner,
        is_deleted,
        is_visible,
      ];

      await client.query(queryText, queryValues);

      await client.query('COMMIT');

      res.status(200).json({ message: 'Game updated successfully' });
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
        DELETE FROM games
        WHERE id = $1
      `;

      await client.query(queryText, [id]);

      await client.query('COMMIT');

      res.status(200).json({ message: 'Game deleted successfully' });
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
      let queryText = 'SELECT * FROM games ORDER BY match_time DESC';
      const queryValues = []; 

      if (id) {
        queryText += ' WHERE id = $1';
        queryValues.push(parseInt(id, 10));
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