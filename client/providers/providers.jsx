'use client';
// Radix UI
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return (
    <Theme appearance="light" radius="medium">
      <SessionProvider>{children}</SessionProvider>
    </Theme>
  );
}