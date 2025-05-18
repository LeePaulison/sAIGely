import { WebSocketServer, WebSocket } from 'ws';
import { OpenAI } from 'openai';
import * as userDal from '../dal/users';

import 'dotenv/config'; // auto-loads .env

console.log('[WS] Starting WebSocket server...');
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in the environment variables.');
}

interface AuthedWebSocket extends WebSocket {
  userId?: string;
  tier?: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const wss = new WebSocketServer({ port: 4001 });

wss.on('connection', async (ws, req) => {
  const url = new URL(req.url!, 'http://localhost');
  const userId = url.searchParams.get('userId');

  const authUser = await userDal.getUserByGithubId(userId!);

  if (!authUser) {
    ws.close(1008, 'User ID required');
    return;
  }

  const authedWs = ws as AuthedWebSocket;
  authedWs.userId = authUser.id;

  ws.on('message', async (msg) => {
    try {
      const prompt = msg.toString();

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      });

      for await (const chunk of response) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) ws.send(JSON.stringify({ type: 'delta', content: delta }));
      }

      ws.send(JSON.stringify({ type: 'done' }));
    } catch (err) {
      console.error('[WS] OpenAI error:', err);
      ws.send('[error]');
    }
  });
});

console.log('[WS] WebSocket server started on ws://localhost:4001');
