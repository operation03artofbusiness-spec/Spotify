import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import { Playlist, Track } from '@/types';
import { createPlaylist, fetchRecommendedTracks, updatePlaylist } from '@/services/musicService';
import { useUserStore } from '@/store/userStore';
import { TrackRow } from '@/components/TrackRow';
import { usePlayerStore } from '@/store/playerStore';

export const PlaylistScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { playlistId } = route.params;
  const { user } = useUserStore();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [name, setName] = useState('');
  const { setQueue, setCurrentTrack } = usePlayerStore();

  useEffect(() => {
    const loadPlaylist = async () => {
      const recommended = await fetchRecommendedTracks();
      setTracks(recommended);
      if (playlistId === 'new' && user) {
        const newPlaylist: Playlist = {
          id: `${user.id}-${Date.now()}`,
          name: 'New Playlist',
          trackIds: [],
          ownerId: user.id
        };
        await createPlaylist(newPlaylist);
        setPlaylist(newPlaylist);
        setName(newPlaylist.name);
        return;
      }
      setPlaylist({
        id: playlistId,
        name: 'Your Playlist',
        trackIds: recommended.map((track) => track.id),
        ownerId: user?.id ?? ''
      });
      setName('Your Playlist');
    };
    loadPlaylist();
  }, [playlistId, user]);

  const handleSave = async () => {
    if (!playlist || !user) {
      return;
    }
    await updatePlaylist(playlist.id, user.id, { name });
    setPlaylist({ ...playlist, name });
  };

  const handlePlayTrack = (track: Track) => {
    setQueue(tracks);
    setCurrentTrack(track);
    navigation.navigate('Player');
  };

  if (!playlist) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading playlist...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Playlist</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholderTextColor={colors.textSecondary} />
      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
      <Text style={styles.sectionTitle}>Tracks</Text>
      {tracks.map((track) => (
        <TrackRow key={track.id} track={track} onPress={() => handlePlayTrack(track)} />
      ))}
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
  title: {
    color: colors.textPrimary,
    ...typography.title,
    marginBottom: spacing.sm
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.sm,
    color: colors.textPrimary,
    marginBottom: spacing.sm
  },
  saveButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    alignSelf: 'flex-start',
    marginBottom: spacing.lg
  },
  saveText: {
    color: colors.textPrimary,
    fontWeight: '700'
  },
  sectionTitle: {
    color: colors.textPrimary,
    ...typography.subtitle,
    marginBottom: spacing.sm
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background
  },
  loadingText: {
    color: colors.textSecondary
  }
});
