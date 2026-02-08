import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { RootNavigator } from '@/navigation/RootNavigator';
import { MiniPlayer } from '@/components/MiniPlayer';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useNotifications } from '@/hooks/useNotifications';
import { colors } from '@/constants/theme';
import { navigate } from '@/navigation/navigationRef';

export default function App() {
  const { togglePlayPause } = useAudioPlayer();

  useNotifications();

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <RootNavigator />
        <MiniPlayer onPress={() => navigate('Player')} onTogglePlay={togglePlayPause} />
      </View>
    </SafeAreaProvider>
  );
}
