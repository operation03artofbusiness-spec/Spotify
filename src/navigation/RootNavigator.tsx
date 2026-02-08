import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { PlayerScreen } from '@/screens/PlayerScreen';
import { ArtistScreen } from '@/screens/ArtistScreen';
import { PlaylistScreen } from '@/screens/PlaylistScreen';
import { AuthScreen } from '@/screens/AuthScreen';
import { useUserStore } from '@/store/userStore';
import { colors } from '@/constants/theme';
import { navigationRef } from './navigationRef';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const { user } = useUserStore();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.textPrimary
        }}
      >
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Artist" component={ArtistScreen} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
