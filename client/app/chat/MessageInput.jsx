// app/chat/MessageInput.jsx
import { useState, useEffect } from 'react';
import { Button } from '@radix-ui/themes';

export default function MessageInput({ onSend, isStreaming }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setInput('');
  };

  useEffect(() => {
    const unsentMessage = localStorage.getItem('unsentMessage');
    if (unsentMessage) {
      setInput(unsentMessage);
      localStorage.removeItem('unsentMessage');
    }
  }, []);

  return (
    <div className="p-4 border-t flex items-end gap-2 bg-white">
      <textarea
        className="flex-1 p-2 border rounded text-base min-h-[3rem] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message…"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        disabled={isStreaming}
      />
      <Button onClick={handleSend} disabled={!input.trim() || isStreaming}>
        Send
      </Button>
    </div>
  );
}
