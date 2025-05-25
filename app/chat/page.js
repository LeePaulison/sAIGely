// app/chat/page.js

'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useChatSocket } from '@/lib/wsClient';
import ChatWindow from './ChatWindow';
import SignInModal from '@/components/signInModal/signInModal';

export default function ChatPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const isAuthenticated = status === 'authenticated';

  console.log('[Chat/page.js] User ID:', userId);

  const { messages, sendMessage, isConnected, isStreaming } = useChatSocket(userId);

  const [isSignInModalOpen, setSignInModalOpen] = useState(false);

  const requireAuth = (unsentMessage) => {
    if (!isAuthenticated) {
      localStorage.setItem('unsentMessage', unsentMessage);
      setSignInModalOpen(true);
      return false;
    }

    return true;
  };

  const handleSignInModalClose = () => {
    setSignInModalOpen(false);
  };

  return (
    <>
      <ChatWindow
        messages={messages}
        onSend={sendMessage}
        isStreaming={isStreaming}
        isConnected={isConnected}
        requireAuth={requireAuth}
      />
      <SignInModal open={isSignInModalOpen} onOpenChange={handleSignInModalClose} />
    </>
  );
}
