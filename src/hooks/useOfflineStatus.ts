'use client';

import { useEffect } from 'react';
import { useToastStore } from '@/store/useToastStore';

export const useOfflineStatus = () => {
  const { pushToast } = useToastStore();

  useEffect(() => {
    const handleOnline = () => pushToast('Back online. Syncing your library.');
    const handleOffline = () => pushToast('You are offline. Playing cached tracks.');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pushToast]);
};
