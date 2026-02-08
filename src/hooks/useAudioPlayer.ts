import { useEffect, useRef } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { usePlayerStore } from '@/store/playerStore';
import { Track } from '@/types';

export const useAudioPlayer = () => {
  const soundRef = useRef<Audio.Sound | null>(null);
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    updateProgress,
    repeatMode,
    shuffle,
    queue,
    setCurrentTrack
  } = usePlayerStore();

  const loadTrack = async (track: Track) => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(
      { uri: track.audioUrl },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    soundRef.current = sound;
    setIsPlaying(true);
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }
    updateProgress(status.positionMillis / 1000, status.durationMillis ? status.durationMillis / 1000 : 0);
    if (status.didJustFinish) {
      handleNext();
    }
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) {
      return;
    }
    if (isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const handleNext = async () => {
    if (!currentTrack) {
      return;
    }
    const currentIndex = queue.findIndex((track) => track.id === currentTrack.id);
    const nextIndex = shuffle
      ? Math.floor(Math.random() * queue.length)
      : (currentIndex + 1) % queue.length;
    const nextTrack = queue[nextIndex];
    if (!nextTrack) {
      return;
    }
    setCurrentTrack(nextTrack);
    await loadTrack(nextTrack);
  };

  const handlePrevious = async () => {
    if (!currentTrack) {
      return;
    }
    const currentIndex = queue.findIndex((track) => track.id === currentTrack.id);
    const prevIndex = currentIndex - 1 < 0 ? queue.length - 1 : currentIndex - 1;
    const prevTrack = queue[prevIndex];
    if (!prevTrack) {
      return;
    }
    setCurrentTrack(prevTrack);
    await loadTrack(prevTrack);
  };

  const handleRepeat = async () => {
    if (!soundRef.current) {
      return;
    }
    if (repeatMode === 'one') {
      await soundRef.current.replayAsync();
    } else {
      await handleNext();
    }
  };

  useEffect(() => {
    if (!currentTrack) {
      return;
    }
    loadTrack(currentTrack);
  }, [currentTrack]);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      allowsRecordingIOS: false
    });

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  return {
    togglePlayPause,
    handleNext: repeatMode === 'one' ? handleRepeat : handleNext,
    handlePrevious
  };
};
