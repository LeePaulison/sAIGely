'use client';
// Radix UI
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export default function Providers({ children }) {
  return (
    <Theme appearance="light" radius="medium">
      {children}
    </Theme>
  );
}