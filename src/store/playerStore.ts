import { create } from 'zustand';
import { Track } from '@/types';

export type RepeatMode = 'off' | 'one' | 'all';

type PlayerState = {
  queue: Track[];
  currentTrack?: Track;
  isPlaying: boolean;
  shuffle: boolean;
  repeatMode: RepeatMode;
  position: number;
  duration: number;
  setQueue: (tracks: Track[]) => void;
  setCurrentTrack: (track?: Track) => void;
  setIsPlaying: (value: boolean) => void;
  toggleShuffle: () => void;
  setRepeatMode: (mode: RepeatMode) => void;
  updateProgress: (position: number, duration: number) => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  queue: [],
  currentTrack: undefined,
  isPlaying: false,
  shuffle: false,
  repeatMode: 'off',
  position: 0,
  duration: 0,
  setQueue: (tracks) => set({ queue: tracks }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (value) => set({ isPlaying: value }),
  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
  setRepeatMode: (mode) => set({ repeatMode: mode }),
  updateProgress: (position, duration) => set({ position, duration })
}));
