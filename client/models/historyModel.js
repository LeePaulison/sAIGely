// /models/historyModel.js
import { getMongoDB } from '@/lib/db.js';

/**
 * Log an AI event (one prompt/response cycle).
 * Each record is immutable and serves for analytics, audits, or summaries.
 */
export async function logAIEvent(eventData) {
  const db = await getMongoDB();

  const doc = {
    ...eventData,
    created_at: new Date(),
  };

  const result = await db.collection('ai_history').insertOne(doc);
  return result.insertedId;
}

/**
 * Fetch recent AI events for a user.
 * Optionally limit or filter by model.
 */
export async function getUserAIHistory(userId, { model, limit = 50 } = {}) {
  const db = await getMongoDB();

  const query = { user_id: userId };
  if (model) query.model = model;

  const history = await db.collection('ai_history').find(query).sort({ created_at: -1 }).limit(limit).toArray();

  return history;
}

/**
 * Delete old history entries (optional maintenance).
 * e.g., keep only last 30 days for each user.
 */
export async function pruneOldHistory(days = 30) {
  const db = await getMongoDB();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const { deletedCount } = await db.collection('ai_history').deleteMany({ created_at: { $lt: cutoff } });

  return deletedCount;
}
