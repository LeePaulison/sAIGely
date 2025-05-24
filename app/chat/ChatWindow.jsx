'use client';

import { useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatWindow({ messages, onSend, isStreaming }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Message History */}
      <ScrollArea.Root className="flex-1 overflow-hidden">
        <ScrollArea.Viewport className="h-full p-4 space-y-2">
          <MessageList messages={messages} />
        </ScrollArea.Viewport>
      </ScrollArea.Root>

      {/* Message Input */}
      <MessageInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isStreaming={isStreaming}
      />
    </div>
  );
}
