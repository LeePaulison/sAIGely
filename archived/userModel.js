import db from '../client/lib/db.js';

export async function getUserBySub(sub) {
  const result = await db.query('SELECT * FROM users WHERE sub = $1 LIMIT 1', [sub]);
  return result.rows[0] || null;
}

export async function createUserIfNotExists({ sub, name, email }) {
  const existing = await getUserBySub(sub);
  if (existing) return existing;

  const result = await db.query(
    `
    INSERT INTO users (sub, name, email)
    VALUES ($1, $2, $3)
    RETURNING 
      id,
      sub,
      name,
      email,
      created_at,
      updated_at;
  `,
    [sub, name, email]
  );

  return result.rows[0];
}
