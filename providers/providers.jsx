'use client';
// Next Auth
import { SessionProvider } from 'next-auth/react';
// Radix UI
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <Theme appearance="light" radius="medium">
        {children}
      </Theme>
    </SessionProvider>
  );
}