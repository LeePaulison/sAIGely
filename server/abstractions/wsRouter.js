import { handleChat } from '../services/chatService.js';

export function routeWebSocketMessage(ws, message) {
  // Basic validation
  if (typeof message !== 'object' || !message.role || !message.content) {
    ws.send(JSON.stringify({ role: 'system', content: 'Invalid message format' }));
    return;
  }

  // Route based on role/type — easy to expand later
  switch (message.role) {
    case 'user':
      handleChat(ws, message);
      break;
    default:
      ws.send(JSON.stringify({ role: 'system', content: 'Unknown message role' }));
  }
}
