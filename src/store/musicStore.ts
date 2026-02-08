import { create } from 'zustand';
import { Song, Playlist, Artist } from '../types/music';
import { fetchHomeData, fetchLibraryData, searchCatalog, fetchArtistProfile } from '../services/musicService';

interface MusicState {
  recentlyPlayed: Song[];
  trendingPlaylists: Playlist[];
  recommendedSongs: Song[];
  likedSongs: Song[];
  savedPlaylists: Playlist[];
  artists: Artist[];
  isLoading: boolean;
  loadHome: () => Promise<void>;
  loadLibrary: () => Promise<void>;
  search: (query: string) => Promise<{ songs: Song[]; artists: Artist[]; albums: Playlist[] }>;
  getArtist: (artistId: string) => Promise<{ artist: Artist; songs: Song[]; albums: Playlist[] }>;
}

export const useMusicStore = create<MusicState>((set) => ({
  recentlyPlayed: [],
  trendingPlaylists: [],
  recommendedSongs: [],
  likedSongs: [],
  savedPlaylists: [],
  artists: [],
  isLoading: false,
  loadHome: async () => {
    set({ isLoading: true });
    const data = await fetchHomeData();
    set({ ...data, isLoading: false });
  },
  loadLibrary: async () => {
    set({ isLoading: true });
    const data = await fetchLibraryData();
    set({ ...data, isLoading: false });
  },
  search: async (query) => searchCatalog(query),
  getArtist: async (artistId) => fetchArtistProfile(artistId),
}));
