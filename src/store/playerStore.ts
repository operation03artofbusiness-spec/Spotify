import { create } from 'zustand';
import { Audio } from 'expo-av';
import { Song } from '../types/music';
import { getCachedAudioUri, cacheAudioTrack } from '../services/downloadService';
import { useOfflineStore } from './offlineStore';

type RepeatMode = 'off' | 'one' | 'all';

type PlayerState = {
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
  repeatMode: RepeatMode;
  shuffle: boolean;
  sound: Audio.Sound | null;
  setQueue: (songs: Song[], startIndex?: number) => Promise<void>;
  playPause: () => Promise<void>;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
  seekTo: (millis: number) => Promise<void>;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  updatePlaybackStatus: (status: Audio.AVPlaybackStatus) => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  positionMillis: 0,
  durationMillis: 1,
  repeatMode: 'off',
  shuffle: false,
  sound: null,
  setQueue: async (songs, startIndex = 0) => {
    const { sound } = get();
    if (sound) {
      await sound.unloadAsync();
    }

    const track = songs[startIndex];
    if (!track) return;

    const { isOffline } = useOfflineStore.getState();
    const cachedUri = await getCachedAudioUri(track.id);
    const sourceUri = isOffline && cachedUri ? cachedUri : track.audioUrl;

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: sourceUri },
      { shouldPlay: true },
      (status) => get().updatePlaybackStatus(status)
    );

    set({ queue: songs, currentIndex: startIndex, sound: newSound, isPlaying: true });
    cacheAudioTrack(track);
  },
  playPause: async () => {
    const { sound, isPlaying } = get();
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    } else {
      await sound.playAsync();
      set({ isPlaying: true });
    }
  },
  playNext: async () => {
    const { queue, currentIndex, repeatMode } = get();
    if (!queue.length) return;
    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      await get().setQueue(queue, nextIndex);
    } else if (repeatMode === 'all') {
      await get().setQueue(queue, 0);
    }
  },
  playPrevious: async () => {
    const { queue, currentIndex } = get();
    if (!queue.length) return;
    const prevIndex = Math.max(currentIndex - 1, 0);
    await get().setQueue(queue, prevIndex);
  },
  seekTo: async (millis) => {
    const { sound } = get();
    if (sound) {
      await sound.setPositionAsync(millis);
      set({ positionMillis: millis });
    }
  },
  toggleShuffle: () => set((state) => ({ shuffle: !state.shuffle })),
  toggleRepeat: () =>
    set((state) => ({
      repeatMode: state.repeatMode === 'off' ? 'all' : state.repeatMode === 'all' ? 'one' : 'off',
    })),
  updatePlaybackStatus: (status) => {
    if (!status.isLoaded) return;
    set({
      positionMillis: status.positionMillis,
      durationMillis: status.durationMillis || 1,
      isPlaying: status.isPlaying,
    });
    if (status.didJustFinish && get().repeatMode === 'one') {
      get().seekTo(0);
    }
  },
}));
