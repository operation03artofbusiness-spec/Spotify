import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { colors, spacing, typography } from '@/constants/theme';
import { TrackRow } from '@/components/TrackRow';
import { Playlist, Track } from '@/types';
import { fetchRecentlyPlayed } from '@/services/musicService';
import { logout } from '@/services/authService';
import { usePlayerStore } from '@/store/playerStore';

export const LibraryScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useUserStore();
  const [likedSongs, setLikedSongs] = useState<Track[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const { setQueue, setCurrentTrack } = usePlayerStore();

  useEffect(() => {
    if (!user) {
      return;
    }
    const loadData = async () => {
      const recent = await fetchRecentlyPlayed(user.id);
      setLikedSongs(recent.filter((track) => track.isLiked));
      setPlaylists([
        {
          id: 'liked',
          name: 'Liked Songs',
          trackIds: recent.map((track) => track.id),
          ownerId: user.id
        }
      ]);
    };
    loadData();
  }, [user]);

  const handlePlayTrack = (track: Track) => {
    setQueue(likedSongs);
    setCurrentTrack(track);
    navigation.navigate('Player');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
        <Pressable onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Playlists</Text>
        {playlists.map((playlist) => (
          <Pressable key={playlist.id} onPress={() => navigation.navigate('Playlist', { playlistId: playlist.id })}>
            <Text style={styles.playlistItem}>{playlist.name}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Liked Songs</Text>
        {likedSongs.map((track) => (
          <TrackRow key={track.id} track={track} onPress={() => handlePlayTrack(track)} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg
  },
  title: {
    color: colors.textPrimary,
    ...typography.title
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12
  },
  logoutText: {
    color: colors.textSecondary
  },
  section: {
    marginBottom: spacing.lg
  },
  sectionTitle: {
    color: colors.textPrimary,
    ...typography.subtitle,
    marginBottom: spacing.sm
  },
  playlistItem: {
    color: colors.textSecondary,
    marginBottom: spacing.sm
  }
});
