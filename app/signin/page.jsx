'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState('')

  const handleEmailLogin = async (e) => {
    e.preventDefault()
    if (!email) return
    await signIn('email', { email, callbackUrl: '/' })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl shadow-md p-6 bg-white">
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign in to sAIgely</h1>

        {/* GitHub button */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/' })}
          className="w-full py-2 mb-4 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="flex items-center mb-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Email magic link form */}
        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Send Magic Link
          </button>
        </form>
      </div>
    </main>
  )
}
