import { streamOpenAIResponse } from '../lib/openai.js';

export async function handleChat(ws, message, userId) {
  if (!message.content || message.role !== 'user') {
    ws.send(JSON.stringify({ role: 'system', content: 'Invalid message format' }));
    return;
  }

  const onChunk = (chunk) => {
    ws.send(JSON.stringify({ role: 'assistant', content: chunk }));
  };

  await streamOpenAIResponse(message.content, onChunk);
}
