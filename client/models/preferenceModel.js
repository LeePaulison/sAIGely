import { queryPostgres } from '@/lib/db.js';

// fetch preferences by user ID
export async function getPreferencesByUserId(userId) {
  const { rows } = await queryPostgres('SELECT * FROM saigely.preferences WHERE user_id = $1', [userId]);
  return rows[0] || null;
}

// upsert preferences
export async function upsertPreferences(userId, preferencesData) {
  const {
    user_id,
    theme,
    provider_override,
    model_override,
    tone,
    temperature_override,
    max_tokens_override,
    programming_language,
    store_conversations,
    auto_summarize,
  } = preferencesData;

  const { rowCount } = await queryPostgres(
    `
    INSERT INTO saigely.preferences (
      user_id,
      theme,
      provider_override,
      model_override,
      tone,
      temperature_override,
      max_tokens_override,
      programming_language,
      store_conversations,
      auto_summarize
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    ON CONFLICT (user_id) DO UPDATE SET
      theme = EXCLUDED.theme,
      provider_override = EXCLUDED.provider_override,
      model_override = EXCLUDED.model_override,
      tone = EXCLUDED.tone,
      temperature_override = EXCLUDED.temperature_override,
      max_tokens_override = EXCLUDED.max_tokens_override,
      programming_language = EXCLUDED.programming_language,
      store_conversations = EXCLUDED.store_conversations,
      auto_summarize = EXCLUDED.auto_summarize
    `,
    [
      user_id,
      theme,
      provider_override,
      model_override,
      tone,
      temperature_override,
      max_tokens_override,
      programming_language,
      store_conversations,
      auto_summarize,
    ]
  );

  return rowCount > 0;
}
