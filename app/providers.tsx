'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/lib/serviceWorker';
import { initializeMessaging } from '@/lib/notifications';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { useAuthStore } from '@/store/useAuthStore';

export function Providers({ children }: { children: React.ReactNode }) {
  useOfflineStatus();
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const unsubscribe = initialize();
    registerServiceWorker();
    initializeMessaging();
    return () => unsubscribe();
  }, [initialize]);

  return <>{children}</>;
}
