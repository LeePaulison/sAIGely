'use client';
// This is a client component
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <button onClick={() => signOut()} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
        Sign Out
      </button>
    );
  }

  return (
    <button onClick={() => signIn()} className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
      Sign In
    </button>
  );
}
