import { WebSocketServer } from 'ws';
import url from 'url';
import { routeWebSocketMessage } from '../abstractions/wsRouter.js';

const wss = new WebSocketServer({ port: process.env.WS_PORT || 4001 });

wss.on('connection', (ws, req) => {
  const { query } = url.parse(req.url, true);
  const userId = query.userId;

  console.log('New connection:', userId);

  if (!userId) {
    ws.close(1008, 'Missing userId');
    return;
  }

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
      console.log('Received message:', parsed);
      routeWebSocketMessage(ws, parsed, userId);
    } catch {
      ws.send(JSON.stringify({ role: 'system', content: 'Invalid JSON' }));
    }
  });
});

console.log('WebSocket server listening on ws://localhost:4001');
