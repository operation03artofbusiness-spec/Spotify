import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
});

export const useNotifications = () => {
  useEffect(() => {
    const register = async () => {
      const settings = await Notifications.getPermissionsAsync();
      let status = settings.status;
      if (status !== 'granted') {
        const request = await Notifications.requestPermissionsAsync();
        status = request.status;
      }
      if (status !== 'granted') {
        return;
      }
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('new-releases', {
          name: 'New Releases',
          importance: Notifications.AndroidImportance.HIGH
        });
      }
    };

    register();
  }, []);
};
