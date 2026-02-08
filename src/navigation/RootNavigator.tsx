import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '../store/authStore';
import AuthScreen from '../screens/AuthScreen';
import MainTabs from './MainTabs';
import PlayerScreen from '../screens/PlayerScreen';
import ArtistScreen from '../screens/ArtistScreen';
import PlaylistScreen from '../screens/PlaylistScreen';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Player: { songId?: string };
  Artist: { artistId: string };
  Playlist: { playlistId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Player" component={PlayerScreen} />
          <Stack.Screen name="Artist" component={ArtistScreen} />
          <Stack.Screen name="Playlist" component={PlaylistScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}
