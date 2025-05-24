import React from 'react';
import { Button, Heading } from '@radix-ui/themes';

export default function Header() {
  return (
    <header className="w-full px-4 py-3 border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Title */}
        <a href="/" className="group transition-colors duration-200">
          <Heading
            as="h1"
            size="4"
            className="text-slate-700 group-hover:text-slate-900 group-hover:underline underline-offset-4 decoration-1"
          >
            Project-Sage
          </Heading>
        </a>

        {/* Nav / Actions */}
        <div className="flex items-center gap-4">
          {/* Placeholder for navigation if needed */}
          {/* <a href="/docs" className="text-sm text-gray-600 hover:text-gray-800">Docs</a> */}

          {/* Auth button */}
          <Button variant="solid" highContrast>
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
