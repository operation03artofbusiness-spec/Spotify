'use client';

import { create } from 'zustand';
import { Track } from './usePlayerStore';

interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface LibraryState {
  likedSongs: Track[];
  playlists: Playlist[];
  recentPlays: Track[];
  addPlaylist: (name: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  likedSongs: [],
  playlists: [],
  recentPlays: [],
  addPlaylist: (name) =>
    set((state) => ({
      playlists: [...state.playlists, { id: Date.now().toString(), name, tracks: [] }]
    })),
  addTrackToPlaylist: (playlistId, track) =>
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, tracks: [...playlist.tracks, track] }
          : playlist
      )
    })),
  removeTrackFromPlaylist: (playlistId, trackId) =>
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, tracks: playlist.tracks.filter((track) => track.id !== trackId) }
          : playlist
      )
    }))
}));
