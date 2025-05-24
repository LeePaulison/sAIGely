'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { signIn } from 'next-auth/react';

export default function SignInModal({ open, onOpenChange }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-slate-50 p-6 shadow-xl border border-slate-200">
          <Dialog.Title className="text-xl font-semibold text-slate-900 mb-2">
            Sign in to Project-Sage
          </Dialog.Title>
          <Dialog.Description className="text-sm text-slate-600 mb-4">
            You need to sign in before you can send messages.
          </Dialog.Description>

          <button
            onClick={() => signIn('github')}
            className="w-full py-2 px-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
          >
            Sign in with GitHub
          </button>

          <Dialog.Close asChild>
            <button
              className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full p-1 text-slate-500 hover:text-slate-700 focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
