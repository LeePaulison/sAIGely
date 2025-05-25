import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import url from 'url';
import { routeWebSocketMessage } from '../abstractions/wsRouter.js';

const wss = new WebSocketServer({ port: process.env.WS_PORT || 4001 });

wss.on('connection', (ws, req) => {
  const { query } = url.parse(req.url, true);
  const token = query.token;

  console.log('[WS] New connection:', req.url);
  console.log('[WS] Secret:', process.env.NEXTAUTH_SECRET);
  console.log('[WS] token type:', typeof token);
  console.log('[WS] token length:', token.length);
  console.log('[WS] Token:', token);

  if (!token) {
    ws.close(1008, 'Missing token');
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    ws.userId = payload.id;
    console.log('[WS] Authenticated userId:', ws.userId);
  } catch (err) {
    console.error('[WS] Invalid token:', err.message);
    ws.close(1008, 'Invalid token');
    return;
  }

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
      console.log('Received message:', parsed);
      routeWebSocketMessage(ws, parsed, ws.userId);
    } catch {
      ws.send(JSON.stringify({ role: 'system', content: 'Invalid JSON' }));
    }
  });
});

console.log('WebSocket server listening on ws://localhost:4001');
