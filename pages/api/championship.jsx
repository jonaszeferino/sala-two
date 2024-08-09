import pool from '../../utils/db';

export default async function handler(req, res) {
  console.log('Método recebido:', req.method);
  
  if (req.method === 'POST') {
    await handleInsert(req, res);
  } else if (req.method === 'PATCH') {
    await handleUpdate(req, res);
  } else if (req.method === 'DELETE') {
    await handleDelete(req, res);
  } else if (req.method === 'GET') {
    await handleGet(req, res);
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}

async function handleInsert(req, res) {
  const { name, season, logo_image } = req.body;
  
  console.log('Dados recebidos:', { name, season, logo_image });

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        INSERT INTO public.championship (
          name,
          season,
          logo_image
        ) VALUES ($1, $2, $3)
        RETURNING id, created_at, name, season, logo_image
      `;

      const queryValues = [name, season, logo_image];

      console.log('Query:', queryText);
      console.log('Valores:', queryValues);

      const result = await client.query(queryText, queryValues);

      await client.query('COMMIT');

      console.log('Resultado da inserção:', result.rows[0]);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Erro ao executar query:', error);
      res.status(500).json({ error: error.message || 'Erro desconhecido' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message || 'Erro desconhecido' });
  }
}

async function handleUpdate(req, res) {
  const { id, name, season, logo_image } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        UPDATE public.championship
        SET
          name = $2,
          season = $3,
          logo_image = $4
        WHERE id = $1
        RETURNING id, created_at, name, season, logo_image
      `;

      const queryValues = [id, name, season, logo_image];

      const result = await client.query(queryText, queryValues);

      await client.query('COMMIT');

      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Campeonato não encontrado' });
      } else {
        res.status(200).json(result.rows[0]);
      }
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Erro ao executar query:', error);
      res.status(500).json({ error: error.message || 'Erro desconhecido' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message || 'Erro desconhecido' });
  }
}

async function handleDelete(req, res) {
  const { id } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const queryText = `
        DELETE FROM public.championship
        WHERE id = $1
        RETURNING id
      `;

      const result = await client.query(queryText, [id]);

      await client.query('COMMIT');

      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Campeonato não encontrado' });
      } else {
        res.status(200).json({ message: 'Campeonato excluído com sucesso' });
      }
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Erro ao executar query:', error);
      res.status(500).json({ error: error.message || 'Erro desconhecido' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message || 'Erro desconhecido' });
  }
}

async function handleGet(req, res) {
  const { id } = req.query;

  try {
    const client = await pool.connect();
    try {
      let queryText = 'SELECT id, created_at, name, season, logo_image FROM public.championship';
      const queryValues = [];

      if (id) {
        queryText += ' WHERE id = $1';
        queryValues.push(parseInt(id, 10));
      }

      const result = await client.query(queryText, queryValues);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Erro ao executar query:', error);
      res.status(500).json({ error: error.message || 'Erro desconhecido' });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message || 'Erro desconhecido' });
  }
}