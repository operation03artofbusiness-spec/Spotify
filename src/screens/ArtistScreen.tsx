import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useMusicStore } from '../store/musicStore';
import { usePlayerStore } from '../store/playerStore';
import SongRow from '../components/SongRow';
import { Artist, Playlist, Song } from '../types/music';

export default function ArtistScreen() {
  const route = useRoute();
  const { artistId } = route.params as { artistId: string };
  const getArtist = useMusicStore((state) => state.getArtist);
  const setQueue = usePlayerStore((state) => state.setQueue);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Playlist[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    getArtist(artistId).then((data) => {
      setArtist(data.artist);
      setSongs(data.songs);
      setAlbums(data.albums);
    });
  }, [artistId, getArtist]);

  if (!artist) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: artist.imageUrl }} style={styles.hero} />
      <Text style={styles.name}>{artist.name}</Text>
      <Text style={styles.bio}>{artist.bio}</Text>
      <Text style={styles.stats}>{artist.followers.toLocaleString()} followers</Text>

      <Pressable style={styles.followButton} onPress={() => setIsFollowing(!isFollowing)}>
        <Text style={styles.followText}>{isFollowing ? 'Following' : 'Follow'}</Text>
      </Pressable>

      <Text style={styles.section}>Popular</Text>
      {songs.map((song) => (
        <SongRow
          key={song.id}
          song={song}
          onPress={() => setQueue(songs, songs.findIndex((item) => item.id === song.id))}
        />
      ))}

      <Text style={styles.section}>Albums</Text>
      {albums.map((album) => (
        <View key={album.id} style={styles.albumRow}>
          <Image source={{ uri: album.artworkUrl }} style={styles.albumArtwork} />
          <Text style={styles.albumName}>{album.name}</Text>
        </View>
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
    height: 260,
    borderRadius: 20,
    marginBottom: 16,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },
  bio: {
    color: '#B3B3B3',
    marginVertical: 8,
  },
  stats: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  followButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginVertical: 16,
  },
  followText: {
    color: '#0B0B0B',
    fontWeight: '700',
  },
  section: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
  },
  albumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  albumArtwork: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  albumName: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
