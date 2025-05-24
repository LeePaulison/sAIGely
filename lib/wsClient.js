import { useEffect, useRef, useState } from 'react';

export function useChatSocket(userId) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const ws = new WebSocket(`ws://localhost:4001?userId=${userId}`);
    socketRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      console.log('[WS] Connected');
    };

    ws.onclose = () => {
      setIsConnected(false);
      console.log('[WS] Disconnected');
    };

    ws.onerror = (err) => {
      console.error('[WS] Error:', err);
    };

    ws.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setMessages((prev) => {
          const last = prev.at(-1);
          if (last?.role === 'assistant') {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...last,
              content: last.content + parsed.content,
            };
            return updated;
          } else {
            return [...prev, { role: 'assistant', content: parsed.content }];
          }
        });
      } catch (err) {
        console.error('[WS] Invalid message:', err);
      }
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  const sendMessage = (text) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn('[WS] Cannot send — socket not open');
      return;
    }

    const userMessage = { role: 'user', content: text };
    socketRef.current.send(JSON.stringify(userMessage));

    console.log('[WS] Sent message:', userMessage);

    setMessages((prev) => [...prev, userMessage, { role: 'assistant', content: '' }]);
    setIsStreaming(true);

    setTimeout(() => setIsStreaming(false), 3000);
  };

  return {
    messages,
    sendMessage,
    isConnected,
    isStreaming,
  };
}
