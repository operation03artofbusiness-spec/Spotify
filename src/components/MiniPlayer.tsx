import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePlayerStore } from '../store/playerStore';

export default function MiniPlayer() {
  const navigation = useNavigation();
  const { queue, currentIndex, isPlaying, playPause } = usePlayerStore();
  const currentTrack = queue[currentIndex];

  if (!currentTrack) return null;

  return (
    <Pressable style={styles.container} onPress={() => navigation.navigate('Player' as never)}>
      <View style={styles.info}>
        <Image source={{ uri: currentTrack.artworkUrl }} style={styles.artwork} />
        <View>
          <Text style={styles.title}>{currentTrack.title}</Text>
          <Text style={styles.artist}>{currentTrack.artistName}</Text>
        </View>
      </View>
      <Pressable onPress={playPause} style={styles.control}>
        <Text style={styles.controlText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 90,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  artist: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  control: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1DB954',
    borderRadius: 12,
  },
  controlText: {
    color: '#0B0B0B',
    fontWeight: '700',
  },
});
