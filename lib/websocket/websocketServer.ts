import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 4001 });

wss.on('connection', (ws) => {
  console.log('[WS] Client connected');

  ws.on('message', async (message) => {
    console.log('[WS] Received:', message.toString());

    // Echo back for now — later we hook OpenAI here
    ws.send(`Server received: ${message.toString()}`);
  });

  ws.on('close', () => {
    console.log('[WS] Client disconnected');
  });
});

console.log('[WS] WebSocket server started on ws://localhost:4001');
