// /models/conversationModel.js
import { getMongoDB } from '@/lib/db.js';

// 🔹 Fetch all conversations for a user
export async function getConversationsByUserId(userId) {
  const db = await getMongoDB();
  const conversations = await db
    .collection('conversations')
    .find({ user_id: userId })
    .sort({ updated_at: -1 })
    .toArray();

  return conversations;
}

// 🔹 Fetch a single conversation by ID
export async function getConversationById(conversationId) {
  const db = await getMongoDB();
  const conversation = await db.collection('conversations').findOne({ _id: conversationId });
  return conversation;
}

// 🔹 Create a new conversation
export async function createConversation(conversationData) {
  const db = await getMongoDB();
  const doc = {
    ...conversationData,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const result = await db.collection('conversations').insertOne(doc);
  return result.insertedId;
}

// 🔹 Append a message to a conversation
export async function appendMessage(conversationId, messageData) {
  const db = await getMongoDB();
  const update = {
    $push: { messages: { ...messageData, timestamp: new Date() } },
    $set: { updated_at: new Date() },
  };
  await db.collection('conversations').updateOne({ _id: conversationId }, update);
  return true;
}

// 🔹 Delete a conversation
export async function deleteConversation(conversationId) {
  const db = await getMongoDB();
  const { deletedCount } = await db.collection('conversations').deleteOne({ _id: conversationId });
  return deletedCount > 0;
}
