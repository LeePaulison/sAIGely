import { query } from '../db';

export async function createDefaultPreferences() {
  const result = await query(
    `INSERT INTO preferences (theme, ai_settings, data_retention)
     VALUES ($1, $2, $3) RETURNING id`,
    ['system', '{}', 'standard']
  );

  return result.rows[0].id;
}

export async function getPreferencesById(id: number) {
  const result = await query(`SELECT * FROM preferences WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
}
