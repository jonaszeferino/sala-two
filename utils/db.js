import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_POSTGRES_USER,
  host: process.env.NEXT_PUBLIC_POSTGRES_HOST,
  database: process.env.NEXT_PUBLIC_POSTGRES_DATABASE,
  password: process.env.NEXT_PUBLIC_POSTGRES_PASSWORD,
  port: 6543,
});

export default pool;