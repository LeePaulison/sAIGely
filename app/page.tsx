'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { Theme } from '@radix-ui/themes';

export default function Home() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState('');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      console.log('Session:', session);

      const userId = session?.user?.id;

      if (userId) {
        const ws = new WebSocket(`ws://localhost:4001?userId=${userId}`);
        wsRef.current = ws;

        ws.onopen = () => console.log('[WS] Connected');
        ws.onmessage = (e) => console.log('[WS] Message:', e.data);
        ws.onerror = (e) => console.error('[WS] Error:', e);
        ws.onclose = () => console.log('[WS] Closed');
      }
    };

    fetchSession();

    return () => {
      if (wsRef.current) {
        console.log('[WS] Cleaning up...');
        wsRef.current.close();
      }
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && prompt.trim()) {
      wsRef.current?.send(prompt.trim());
      console.log('[WS] Sent:', prompt.trim());
      setPrompt('');
    }
  };

  return (
    <Theme>
      <header className='flex py-2 px-4 items-center justify-between bg-slate-300'>
        <h1>Welcome to Next.js!</h1>
        {session ? (
          <button
            className='px-4 py-2 bg-amber-900 border border-amber-950 text-amber-50 rounded-md'
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className='px-4 py-2 bg-amber-900 border border-amber-950 text-amber-50 rounded-md'
            onClick={() => signIn('github')}
          >
            Sign In
          </button>
        )}
      </header>

      <main className='h-full flex flex-col items-center justify-center gap-4 p-8'>
        <p>I am the main Semantic HTML Element</p>

        <input
          type='text'
          className='border border-gray-400 rounded-md px-4 py-2 w-full max-w-md'
          placeholder='Ask something...'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </main>

      <footer className='flex py-2 px-4 items-center justify-between bg-slate-300'>
        <p className='ms-auto'>Copyright © 2025</p>
      </footer>
    </Theme>
  );
}
