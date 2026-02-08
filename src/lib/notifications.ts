import { getMessagingIfSupported, isFirebaseConfigured } from '@/lib/firebase';
import { getToken, onMessage } from 'firebase/messaging';
import { useToastStore } from '@/store/useToastStore';

export const initializeMessaging = async () => {
  if (typeof window === 'undefined') return;
  if (!isFirebaseConfigured) return;

  try {
    const messaging = await getMessagingIfSupported();
    if (!messaging) return;
    if (!('Notification' in window)) return;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
    });

    onMessage(messaging, (payload) => {
      const title = payload.notification?.title ?? 'New Release';
      const body = payload.notification?.body ?? 'A new track just dropped.';
      useToastStore.getState().pushToast(`${title}: ${body}`);
    });
  } catch (error) {
    // Silently ignore when notifications are not supported.
  }
};
