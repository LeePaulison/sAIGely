import { getUserById, upsertUser } from '@/models/userModel.js';
import { getPreferencesByUserId, upsertPreferences } from '@/models/preferenceModel.js';
import { getAISettings } from '@/models/core/aiSettingsModel.js';
import {
  createOpaqueToken,
  getOpaqueTokensByUserId,
  deleteExpiredOpaqueTokens,
} from '@/models/core/opaqueTokensModel.js';
import { getConversationsByUserId, createConversation } from '@/models/conversationModel.js';
import { logAIEvent, getUserAIHistory } from '@/models/historyModel.js';

export async function GET() {
  // Replace with your actual test user Number
  const testUserId = '1';
  const testUUID = 'f1568a79-bca6-46a6-b9c2-c7efb32a193e';

  // 1️⃣ Postgres tests
  const user = await getUserById(testUserId);
  const prefs = await getPreferencesByUserId(testUUID);
  const aiDefaults = await getAISettings();

  // Create and fetch opaque tokens
  const tokenData = {
    token: 'test-token-' + Date.now(),
    next_auth_user_id: testUserId,
    expires_at: new Date(Date.now() + 1000 * 60 * 10),
  };
  await createOpaqueToken(tokenData);
  const tokens = await getOpaqueTokensByUserId(testUserId);
  await deleteExpiredOpaqueTokens();

  // 2️⃣ Mongo tests
  const convId = await createConversation({
    user_id: testUserId,
    title: 'Model Test Conversation',
    messages: [{ role: 'user', content: 'Test message' }],
  });
  const conversations = await getConversationsByUserId(testUserId);

  const logId = await logAIEvent({
    user_id: testUserId,
    conversation_id: convId,
    model: 'gpt-4o-mini',
    provider: 'openai',
    tokens_prompt: 10,
    tokens_completion: 50,
    tokens_total: 60,
    temperature: 0.7,
    latency_ms: 1200,
    cost_usd: 0.00002,
  });
  const history = await getUserAIHistory(testUserId);

  return Response.json({
    message: 'Database model tests successful',
    user,
    prefs,
    aiDefaults,
    tokens,
    conversations,
    history,
  });
}
