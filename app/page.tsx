'use client';
// Next Auth
import { useSession, signIn, signOut } from 'next-auth/react';
// Radix UI
import { Theme } from '@radix-ui/themes';

export default function Home() {
  const { data: session } = useSession();

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
      <main className='h-full flex flex-col items-center justify-center'>
        <p>I am the main Semantic HTML Element</p>
      </main>
      <footer className='flex py-2 px-4 items-center justify-between bg-slate-300'>
        <p className='ms-auto'>Copyright © 2025</p>
      </footer>
    </Theme>
  );
}
