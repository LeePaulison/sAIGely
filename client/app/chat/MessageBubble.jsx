// app/chat/MessageBubble.jsx

export default function MessageBubble({ role, content }) {
  const isUser = role === 'user';

  return (
    <div
      className={`max-w-xl px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${isUser
        ? 'ml-auto bg-blue-700 text-slate-50 text-right rounded-br-none'
        : 'mr-auto bg-slate-700 text-slate-50 text-left rounded-bl-none'
        }`}
    >
      {content}
    </div>
  );
}
