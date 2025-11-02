import { WebSocketServer } from 'ws';
import { routeWebSocketMessage } from '../../server/abstractions/wsRouter.js';

const wss = new WebSocketServer({ port: process.env.WS_PORT || 4001 });

wss.on('connection', (ws) => {
  console.log('[WS] New connection');

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message);
      routeWebSocketMessage(ws, parsed);
    } catch {
      ws.send(JSON.stringify({ role: 'system', content: 'Invalid JSON' }));
    }
  });
});

console.log('WebSocket server listening on ws://localhost:4001');
