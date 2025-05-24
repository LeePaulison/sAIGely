// app/chat/page.js

'use client';

import { useState } from 'react';
import ChatWindow from './ChatWindow';

const mockMessages = [
  { role: 'user', content: 'Hello, who are you?' },
  { role: 'assistant', content: 'I’m an AI assistant built using OpenAI!' },
  { role: 'user', content: 'Cool. What can you do?' },
  { role: 'assistant', content: 'I can help you code, write, and reason through problems.' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSend = (newMessage) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: newMessage },
      {
        role: 'assistant',
        content: `Mock response to: "${newMessage}"`,
      },
    ]);
  };

  return (
    <div className='h-screen bg-gray-50'>
      <ChatWindow messages={messages} onSend={handleSend} isStreaming={isStreaming} />
    </div>
  );
}
