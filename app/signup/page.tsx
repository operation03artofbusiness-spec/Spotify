'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignupPage() {
  const { signUpWithEmail } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-spotify-black px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-spotify-card p-8">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-sm text-white/60">Start streaming your favorite tracks.</p>
        <div className="mt-6 space-y-4">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
          />
          <button
            onClick={() => signUpWithEmail(email, password)}
            className="w-full rounded-full bg-spotify-green py-3 text-sm font-semibold text-black"
          >
            Sign up
          </button>
        </div>
        <p className="mt-6 text-sm text-white/60">
          Already have an account?{' '}
          <Link href="/login" className="text-spotify-green">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
