// app/chat/page.js

'use client';

import { useChatSocket } from '@/lib/wsClient';
import ChatWindow from './ChatWindow';

export default function ChatPage() {
  const { messages, sendMessage, isConnected, isStreaming } = useChatSocket();

  return <ChatWindow messages={messages} onSend={sendMessage} isStreaming={isStreaming} isConnected={isConnected} />;
}
