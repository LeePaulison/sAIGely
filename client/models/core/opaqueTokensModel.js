// /models/core/opaqueTokensModel.js
import { queryPostgres } from '@/lib/db.js';

// 🔹 Fetch opaque token by its value
export async function getOpaqueToken(token) {
  const { rows } = await queryPostgres('SELECT * FROM core.opaque_tokens WHERE token = $1', [token]);
  return rows[0] || null;
}

// 🔹 Create a new opaque token
export async function createOpaqueToken({ token, next_auth_user_id, expires_at }) {
  const { rows } = await queryPostgres(
    `
    INSERT INTO core.opaque_tokens (token, next_auth_user_id, expires_at)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [token, next_auth_user_id, expires_at]
  );
  return rows[0];
}

// 🔹 Delete opaque token by token value
export async function deleteOpaqueToken(token) {
  const { rowCount } = await queryPostgres('DELETE FROM core.opaque_tokens WHERE token = $1', [token]);
  return rowCount > 0;
}

// 🔹 Delete all opaque tokens for a user
export async function deleteOpaqueTokensByUserId(next_auth_user_id) {
  const { rowCount } = await queryPostgres('DELETE FROM core.opaque_tokens WHERE next_auth_user_id = $1', [
    next_auth_user_id,
  ]);
  return rowCount > 0;
}

// 🔹 Delete expired opaque tokens
export async function deleteExpiredOpaqueTokens() {
  const { rowCount } = await queryPostgres('DELETE FROM core.opaque_tokens WHERE expires_at < NOW()');
  return rowCount > 0;
}

// 🔹 Fetch all opaque tokens for a user
export async function getOpaqueTokensByUserId(next_auth_user_id) {
  const { rows } = await queryPostgres(
    'SELECT * FROM core.opaque_tokens WHERE next_auth_user_id = $1 ORDER BY expires_at DESC',
    [next_auth_user_id]
  );
  return rows;
}
