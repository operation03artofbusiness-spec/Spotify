import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { useAuthStore } from './src/store/authStore';
import { initializeFirebase } from './src/services/firebase';
import { registerForPushNotifications } from './src/services/notificationService';
import { useOfflineStore } from './src/store/offlineStore';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0B0B0B',
    card: '#121212',
    text: '#FFFFFF',
    border: '#1F1F1F',
    primary: '#1DB954',
  },
};

export default function App() {
  const hydrateSession = useAuthStore((state) => state.hydrateSession);
  const monitorNetwork = useOfflineStore((state) => state.monitorNetwork);

  useEffect(() => {
    initializeFirebase();
    hydrateSession();
    monitorNetwork();
    registerForPushNotifications();
  }, [hydrateSession, monitorNetwork]);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
