import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const registerForPushNotifications = async () => {
  if (!Constants.isDevice) return;
  const settings = await Notifications.getPermissionsAsync();
  let finalStatus = settings.status;
  if (finalStatus !== 'granted') {
    const request = await Notifications.requestPermissionsAsync();
    finalStatus = request.status;
  }
  if (finalStatus !== 'granted') return;
  await Notifications.getExpoPushTokenAsync();
};
