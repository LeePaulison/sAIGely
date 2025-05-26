import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // You can add ssl: { rejectUnauthorized: false } for production if needed
});

const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
