import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMusicStore } from '../store/musicStore';
import MediaCard from '../components/MediaCard';
import SongRow from '../components/SongRow';
import { usePlayerStore } from '../store/playerStore';

export default function SearchScreen() {
  const navigation = useNavigation();
  const { search } = useMusicStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ songs: [], artists: [], albums: [] });
  const setQueue = usePlayerStore((state) => state.setQueue);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const data = await search(query);
      setResults(data);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, search]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Search</Text>
      <TextInput
        placeholder="Songs, artists, albums"
        placeholderTextColor="#8A8A8A"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
      />

      <Text style={styles.section}>Songs</Text>
      {results.songs.map((song) => (
        <SongRow
          key={song.id}
          song={song}
          onPress={() => setQueue(results.songs, results.songs.findIndex((item) => item.id === song.id))}
        />
      ))}

      <Text style={styles.section}>Artists</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {results.artists.map((artist) => (
          <MediaCard
            key={artist.id}
            title={artist.name}
            subtitle={`${artist.followers.toLocaleString()} followers`}
            imageUrl={artist.imageUrl}
            onPress={() => navigation.navigate('Artist' as never, { artistId: artist.id } as never)}
          />
        ))}
      </ScrollView>

      <Text style={styles.section}>Albums</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {results.albums.map((album) => (
          <MediaCard
            key={album.id}
            title={album.name}
            imageUrl={album.artworkUrl}
            onPress={() => navigation.navigate('Playlist' as never, { playlistId: album.id } as never)}
          />
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
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    marginBottom: 24,
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
