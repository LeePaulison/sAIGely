'use client';

import { useState } from 'react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

export default function ChatWindow({ messages, onSend, isStreaming, isConnected }) {
  const [input, setInput] = useState('');

  return (
    <div className="flex flex-col h-full w-full">
      {/* Message History */}
      <ScrollArea.Root className="flex-1 overflow-hidden">
        <ScrollArea.Viewport className="h-full p-4 space-y-2">
          <MessageList messages={messages} />
          {isStreaming && (
            <div className="text-sm text-gray-400 italic pl-1">AI is typing…</div>
          )}
        </ScrollArea.Viewport>
      </ScrollArea.Root>

      {/* Message Input */}
      <MessageInput
        input={input}
        setInput={setInput}
        onSend={onSend}
        isStreaming={isStreaming}
      />
    </div>
  );
}
