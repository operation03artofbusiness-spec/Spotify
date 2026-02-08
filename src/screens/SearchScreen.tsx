import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { searchContent } from '@/services/musicService';
import { TrackRow } from '@/components/TrackRow';
import { MediaCard } from '@/components/MediaCard';
import { Artist, Track } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';
import { usePlayerStore } from '@/store/playerStore';

export const SearchScreen = ({ navigation }: { navigation: any }) => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const { setQueue, setCurrentTrack } = usePlayerStore();

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query) {
        setTracks([]);
        setArtists([]);
        return;
      }
      const result = await searchContent(query);
      setTracks(result.tracks);
      setArtists(result.artists);
    }, 250);

    return () => clearTimeout(handler);
  }, [query]);

  const handlePlayTrack = (track: Track) => {
    setQueue(tracks);
    setCurrentTrack(track);
    navigation.navigate('Player');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Songs, artists, albums"
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
      />
      {artists.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Artists</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {artists.map((artist) => (
              <MediaCard
                key={artist.id}
                title={artist.name}
                subtitle={`${artist.followers} followers`}
                artworkUrl={artist.imageUrl}
                onPress={() => navigation.navigate('Artist', { artistId: artist.id })}
              />
            ))}
          </ScrollView>
        </View>
      )}
      {tracks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Songs</Text>
          {tracks.map((track) => (
            <TrackRow key={track.id} track={track} onPress={() => handlePlayTrack(track)} />
          ))}
        </View>
      )}
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
    marginBottom: spacing.md
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.sm,
    color: colors.textPrimary,
    marginBottom: spacing.lg
  },
  section: {
    marginBottom: spacing.lg
  },
  sectionTitle: {
    color: colors.textPrimary,
    ...typography.subtitle,
    marginBottom: spacing.sm
  }
});
