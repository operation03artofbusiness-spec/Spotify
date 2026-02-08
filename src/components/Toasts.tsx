'use client';

import { useEffect } from 'react';
import { useToastStore } from '@/store/useToastStore';

export function Toasts() {
  const { toasts, removeToast } = useToastStore();

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), 4000)
    );
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, removeToast]);

  return (
    <div className="fixed right-6 top-6 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-xl border border-white/10 bg-black/80 px-4 py-3 text-sm text-white shadow-lg"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
