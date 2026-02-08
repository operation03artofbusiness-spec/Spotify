import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMusicStore } from '../store/musicStore';
import { usePlayerStore } from '../store/playerStore';
import MediaCard from '../components/MediaCard';
import SongRow from '../components/SongRow';
import SectionHeader from '../components/SectionHeader';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { recentlyPlayed, trendingPlaylists, recommendedSongs, loadHome } = useMusicStore();
  const setQueue = usePlayerStore((state) => state.setQueue);

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Good evening</Text>

      <SectionHeader title="Recently Played" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {recentlyPlayed.map((song) => (
          <MediaCard
            key={song.id}
            title={song.title}
            subtitle={song.artistName}
            imageUrl={song.artworkUrl}
            onPress={() => setQueue(recentlyPlayed, recentlyPlayed.findIndex((item) => item.id === song.id))}
          />
        ))}
      </ScrollView>

      <SectionHeader title="Trending Playlists" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {trendingPlaylists.map((playlist) => (
          <MediaCard
            key={playlist.id}
            title={playlist.name}
            imageUrl={playlist.artworkUrl}
            onPress={() => navigation.navigate('Playlist' as never, { playlistId: playlist.id } as never)}
          />
        ))}
      </ScrollView>

      <SectionHeader title="Recommended for You" />
      <View style={styles.list}>
        {recommendedSongs.map((song) => (
          <SongRow
            key={song.id}
            song={song}
            onPress={() => setQueue(recommendedSongs, recommendedSongs.findIndex((item) => item.id === song.id))}
          />
        ))}
      </View>
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
  greeting: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  row: {
    marginBottom: 24,
  },
  list: {
    marginBottom: 24,
  },
});
