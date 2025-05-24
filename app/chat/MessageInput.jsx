// app/chat/MessageInput.jsx

import { Button } from '@radix-ui/themes';

export default function MessageInput({ input, setInput, onSend, isStreaming }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t flex items-end gap-2 bg-white">
      <textarea
        className="flex-1 p-2 border rounded text-base min-h-[3rem] resize-none text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message…"
        onKeyDown={handleKeyDown}
      />
      <Button onClick={onSend} disabled={!input.trim() || isStreaming}>
        Send
      </Button>
    </div>
  );
}
