import { queryPostgres } from '@/lib/db.js';

// 🔹 Fetch AI settings by user ID
export async function getAISettings() {
  const { rows } = await queryPostgres('SELECT * FROM core.ai_settings LIMIT 1');
  return rows[0] || null;
}
