'use client';
// This is a client component
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import SignInModal from '../signInModal/signInModal';
import { Button, Heading } from '@radix-ui/themes';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="w-full px-4 py-3 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between border-b border-slate-200 pb-3">
        {/* Logo / Title */}
        <a href="/" className="group transition-colors duration-200">
          <Heading
            as="h1"
            size="4"
            className="text-slate-700 group-hover:text-slate-900 group-hover:underline underline-offset-4 decoration-1"
          >
            sAIgely (Project-Sage)
          </Heading>
        </a>

        {/* Nav / Actions */}
        <div className="flex items-center gap-4">
          {/* Placeholder for navigation if needed */}
          {/* <a href="/docs" className="text-sm text-gray-600 hover:text-gray-800">Docs</a> */}

          {/* Auth button */}
          {session?.user ? (
            <button onClick={() => signOut()} className="text-sm text-blue-600">Sign out</button>
          ) : (
            <button onClick={() => signIn('github')} className="text-sm text-blue-600">Sign in</button>
          )}
        </div>
      </div>
    </header>
  );
}
