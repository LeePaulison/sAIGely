'use client';
// This is a client component
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Heading } from '@radix-ui/themes';

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

          {/* Auth button */}
          {session?.user ? (
            <button onClick={() => signOut()} className="text-sm text-blue-600">Sign out</button>
          ) : (
            <Link href="/signin" className="text-sm text-blue-600">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
