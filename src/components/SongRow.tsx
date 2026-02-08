import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Song } from '../types/music';

type SongRowProps = {
  song: Song;
  onPress?: () => void;
};

export default function SongRow({ song, onPress }: SongRowProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: song.artworkUrl }} style={styles.artwork} />
      <View style={styles.info}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.subtitle}>{song.artistName}</Text>
      </View>
      <Text style={styles.duration}>{Math.floor(song.duration / 60000)}:{`${Math.floor((song.duration % 60000) / 1000)}`.padStart(2, '0')}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F1F',
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  subtitle: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  duration: {
    color: '#B3B3B3',
    fontSize: 12,
  },
});
