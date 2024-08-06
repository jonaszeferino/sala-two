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
    article_title,
    reporter_name,
    image_link,
    article_main,
    article_tags,
    is_visible,
    publicated_date,
  } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        INSERT INTO articles (
          article_title,
          reporter_name,
          image_link,
          article_main,
          article_tags,
          is_visible,
          publicated_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;

      const queryValues = [
        article_title,
        reporter_name,
        image_link,
        article_main,
        article_tags,
        is_visible,
        publicated_date,
      ];

      await client.query(queryText, queryValues);

      await client.query('COMMIT');

      res.status(201).json({ message: 'Article inserted successfully' });
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
    article_title,
    reporter_name,
    image_link,
    article_main,
    article_tags,
    is_visible,
    publicated_date,
  } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        UPDATE articles
        SET
          article_title = $2,
          reporter_name = $3,
          image_link = $4,
          article_main = $5,
          article_tags = $6,
          is_visible = $7,
          publicated_date = $8
        WHERE id = $1
      `;

      const queryValues = [
        id,
        article_title,
        reporter_name,
        image_link,
        article_main,
        article_tags,
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

async function handleDelete(req, res) {
  const { news_id } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        DELETE FROM articles
        WHERE id = $1
      `;

      await client.query(queryText, [news_id]);

      await client.query('COMMIT');

      res.status(200).json({ message: 'Article deleted successfully' });
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
      let queryText = 'SELECT * FROM articles order by publicated_date DESC';
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
