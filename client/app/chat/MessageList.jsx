// app/chat/MessageList.jsx

import MessageBubble from './MessageBubble';

export default function MessageList({ messages }) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg, index) => (
        <MessageBubble key={index} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
}
