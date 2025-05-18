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

export async function updatePreferences(
  id: number,
  { theme, ai_settings, data_retention }: { theme?: string; ai_settings?: string; data_retention?: string }
) {
  const result = await query(
    `UPDATE preferences SET theme = $1, ai_settings = $2, data_retention = $3 WHERE id = $4 RETURNING *`,
    [theme, ai_settings, data_retention, id]
  );
  return result.rows[0] ?? null;
}
