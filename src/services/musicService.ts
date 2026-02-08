import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { Song, Playlist, Artist } from '../types/music';
import { mockArtists, mockPlaylists, mockSongs } from '../utils/mockData';

export const fetchHomeData = async () => {
  try {
    const songsSnapshot = await getDocs(collection(db, 'songs'));
    const playlistsSnapshot = await getDocs(collection(db, 'playlists'));
    const songs = songsSnapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Song) }));
    const playlists = playlistsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Playlist),
    }));

    return {
      recentlyPlayed: songs.slice(0, 6),
      trendingPlaylists: playlists.slice(0, 6),
      recommendedSongs: songs.slice(0, 10),
    };
  } catch (error) {
    return {
      recentlyPlayed: mockSongs.slice(0, 6),
      trendingPlaylists: mockPlaylists.slice(0, 6),
      recommendedSongs: mockSongs.slice(0, 10),
    };
  }
};

export const fetchLibraryData = async () => {
  return {
    likedSongs: mockSongs.slice(0, 8),
    savedPlaylists: mockPlaylists.slice(0, 4),
  };
};

export const searchCatalog = async (query: string) => {
  if (!query) {
    return { songs: [], artists: [], albums: [] };
  }
  const lower = query.toLowerCase();
  return {
    songs: mockSongs.filter((song) => song.title.toLowerCase().includes(lower)),
    artists: mockArtists.filter((artist) => artist.name.toLowerCase().includes(lower)),
    albums: mockPlaylists.filter((playlist) => playlist.name.toLowerCase().includes(lower)),
  };
};

export const fetchArtistProfile = async (artistId: string) => {
  const artist = mockArtists.find((item) => item.id === artistId) || mockArtists[0];
  const songs = mockSongs.filter((song) => song.artistId === artistId);
  const albums = mockPlaylists.filter((playlist) => playlist.id === artistId);
  return { artist, songs, albums };
};
