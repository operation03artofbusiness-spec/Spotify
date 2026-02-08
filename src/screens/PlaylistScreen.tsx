import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { usePlayerStore } from '../store/playerStore';
import SongRow from '../components/SongRow';
import { mockPlaylists, mockSongs } from '../utils/mockData';

export default function PlaylistScreen() {
  const route = useRoute();
  const { playlistId } = route.params as { playlistId: string };
  const setQueue = usePlayerStore((state) => state.setQueue);
  const playlist = mockPlaylists.find((item) => item.id === playlistId) || mockPlaylists[0];
  const songs = mockSongs.filter((song) => playlist.songIds.includes(song.id));

  const handleAction = (action: string) => {
    Alert.alert('Playlist Action', `${action} triggered. Connect to Firestore to persist.`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: playlist.artworkUrl }} style={styles.hero} />
      <Text style={styles.title}>{playlist.name}</Text>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={() => handleAction('Rename playlist')}>
          <Text style={styles.actionText}>Rename</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => handleAction('Delete playlist')}>
          <Text style={styles.actionText}>Delete</Text>
        </Pressable>
      </View>

      {songs.map((song) => (
        <SongRow
          key={song.id}
          song={song}
          onPress={() => setQueue(songs, songs.findIndex((item) => item.id === song.id))}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  content: {
    padding: 24,
    paddingBottom: 140,
  },
  hero: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
