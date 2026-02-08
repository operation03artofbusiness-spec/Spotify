import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchRecentlyPlayed, fetchRecommendedTracks, fetchTrendingPlaylists } from '@/services/musicService';
import { MediaCard } from '@/components/MediaCard';
import { TrackRow } from '@/components/TrackRow';
import { Playlist, Track } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { usePlayerStore } from '@/store/playerStore';

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useUserStore();
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [trendingPlaylists, setTrendingPlaylists] = useState<Playlist[]>([]);
  const [recommended, setRecommended] = useState<Track[]>([]);
  const { setQueue, setCurrentTrack } = usePlayerStore();

  useEffect(() => {
    if (!user) {
      return;
    }
    const loadData = async () => {
      const [recent, playlists, tracks] = await Promise.all([
        fetchRecentlyPlayed(user.id),
        fetchTrendingPlaylists(),
        fetchRecommendedTracks()
      ]);
      setRecentlyPlayed(recent);
      setTrendingPlaylists(playlists);
      setRecommended(tracks);
    };
    loadData();
  }, [user]);

  const handlePlayTrack = (track: Track) => {
    setQueue(recommended);
    setCurrentTrack(track);
    navigation.navigate('Player');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Recently Played</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}
        contentContainerStyle={styles.rowContent}
      >
        {recentlyPlayed.map((track) => (
          <MediaCard
            key={track.id}
            title={track.title}
            subtitle={track.artist}
            artworkUrl={track.artworkUrl}
            onPress={() => handlePlayTrack(track)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Trending Playlists</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}
        contentContainerStyle={styles.rowContent}
      >
        {trendingPlaylists.map((playlist) => (
          <MediaCard
            key={playlist.id}
            title={playlist.name}
            subtitle={`${playlist.trackIds.length} tracks`}
            artworkUrl={playlist.artworkUrl ?? 'https://picsum.photos/200'}
            onPress={() => navigation.navigate('Playlist', { playlistId: playlist.id })}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Recommended</Text>
      <View>
        {recommended.map((track) => (
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
    padding: spacing.lg,
    paddingBottom: spacing.xl
  },
  sectionTitle: {
    color: colors.textPrimary,
    ...typography.subtitle,
    marginBottom: spacing.sm
  },
  row: {
    marginBottom: spacing.lg
  },
  rowContent: {
    paddingBottom: spacing.sm
  }
});
