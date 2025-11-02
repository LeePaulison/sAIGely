import http from 'http';
import { WebSocketServer } from 'ws';
import { routeWebSocketMessage } from '../abstractions/wsRouter.js';

const server = http.createServer(); // HTTP server for upgrade
const PORT = process.env.PORT || 4001;

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = message.toString(); // always normalize
    try {
      const parsed = JSON.parse(data);
      routeWebSocketMessage(ws, parsed);
    } catch {
      ws.send(JSON.stringify({ role: 'system', content: 'Invalid JSON' }));
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`WebSocket server listening (upgrade) on :${PORT}`);
});
