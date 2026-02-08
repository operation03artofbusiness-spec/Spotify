import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { useMusicStore } from '../store/musicStore';
import { usePlayerStore } from '../store/playerStore';
import SongRow from '../components/SongRow';
import MediaCard from '../components/MediaCard';
import { useAuthStore } from '../store/authStore';

export default function LibraryScreen() {
  const { likedSongs, savedPlaylists, loadLibrary } = useMusicStore();
  const setQueue = usePlayerStore((state) => state.setQueue);
  const signOut = useAuthStore((state) => state.signOut);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
        <Pressable style={styles.logoutButton} onPress={signOut}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <Text style={styles.section}>Liked Songs</Text>
      {likedSongs.map((song) => (
        <SongRow
          key={song.id}
          song={song}
          onPress={() => setQueue(likedSongs, likedSongs.findIndex((item) => item.id === song.id))}
        />
      ))}

      <Text style={styles.section}>Playlists</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {savedPlaylists.map((playlist) => (
          <MediaCard key={playlist.id} title={playlist.name} imageUrl={playlist.artworkUrl} />
        ))}
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 16,
  },
  row: {
    marginBottom: 12,
  },
});
