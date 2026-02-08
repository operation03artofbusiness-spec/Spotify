'use client';

import { useAuthStore } from '@/store/useAuthStore';

export function TopBar() {
  const { user, signInWithGoogle, signOut } = useAuthStore();

  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-white/60">Good evening</p>
        <h2 className="text-3xl font-semibold">Welcome back</h2>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-white/70">{user.displayName ?? user.email}</span>
            <button
              onClick={signOut}
              className="rounded-full border border-white/20 px-4 py-2 text-sm transition hover:border-white/40"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="rounded-full bg-spotify-green px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Connect with Google
          </button>
        )}
      </div>
    </header>
  );
}
