// app/chat/page.js

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useChatSocket } from '@/lib/wsClient';
import ChatWindow from './ChatWindow';

const mockMessages = [
  { role: 'user', content: 'Hello, who are you?' },
  { role: 'assistant', content: 'I’m an AI assistant built using OpenAI!' },
  { role: 'user', content: 'Cool. What can you do?' },
  { role: 'assistant', content: 'I can help you code, write, and reason through problems.' },
];

export default function ChatPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  console.log('User ID:', userId);

  const { messages, sendMessage, isConnected, isStreaming } = useChatSocket(userId);

  return (
    <>
      <ChatWindow messages={messages} onSend={sendMessage} isStreaming={isStreaming} isConnected={isConnected} />
    </>
  );
}
