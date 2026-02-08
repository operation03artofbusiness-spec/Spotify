import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchArtistProfile, fetchArtistTracks, followArtist, unfollowArtist } from '@/services/musicService';
import { Artist, Track } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';
import { TrackRow } from '@/components/TrackRow';
import { usePlayerStore } from '@/store/playerStore';
import { useUserStore } from '@/store/userStore';

export const ArtistScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { artistId } = route.params;
  const [artist, setArtist] = useState<Artist | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { setQueue, setCurrentTrack } = usePlayerStore();
  const { user } = useUserStore();

  useEffect(() => {
    const loadArtist = async () => {
      const profile = await fetchArtistProfile(artistId);
      const songs = await fetchArtistTracks(artistId);
      setArtist(profile);
      setTracks(songs);
    };
    loadArtist();
  }, [artistId]);

  const handleFollow = async () => {
    if (!user) {
      return;
    }
    if (isFollowing) {
      await unfollowArtist(user.id, artistId);
      setIsFollowing(false);
    } else {
      await followArtist(user.id, artistId);
      setIsFollowing(true);
    }
  };

  const handlePlayTrack = (track: Track) => {
    setQueue(tracks);
    setCurrentTrack(track);
    navigation.navigate('Player');
  };

  if (!artist) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading artist...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: artist.imageUrl }} style={styles.hero} />
      <Text style={styles.name}>{artist.name}</Text>
      <Text style={styles.stats}>{artist.monthlyListeners} monthly listeners</Text>
      <Pressable style={[styles.followButton, isFollowing && styles.following]} onPress={handleFollow}>
        <Text style={styles.followText}>{isFollowing ? 'Following' : 'Follow'}</Text>
      </Pressable>
      <Text style={styles.bio}>{artist.bio}</Text>
      <Text style={styles.sectionTitle}>Top Songs</Text>
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
  hero: {
    width: '100%',
    height: 240,
    borderRadius: 24,
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceElevated
  },
  name: {
    color: colors.textPrimary,
    ...typography.title
  },
  stats: {
    color: colors.textSecondary,
    marginBottom: spacing.sm
  },
  followButton: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.lg,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: spacing.md
  },
  following: {
    backgroundColor: colors.surfaceElevated
  },
  followText: {
    color: colors.textPrimary,
    fontWeight: '600'
  },
  bio: {
    color: colors.textSecondary,
    marginBottom: spacing.lg
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
