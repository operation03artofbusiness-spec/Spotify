import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { usePlayerStore } from '../store/playerStore';
import { fetchLyrics } from '../services/lyricsService';
import { LyricsLine } from '../types/music';

export default function PlayerScreen() {
  const {
    queue,
    currentIndex,
    isPlaying,
    positionMillis,
    durationMillis,
    playPause,
    playNext,
    playPrevious,
    seekTo,
    shuffle,
    repeatMode,
    toggleRepeat,
    toggleShuffle,
  } = usePlayerStore();
  const [lyrics, setLyrics] = useState<LyricsLine[]>([]);
  const [showLyrics, setShowLyrics] = useState(false);

  const currentTrack = queue[currentIndex];

  useEffect(() => {
    if (!currentTrack) return;
    fetchLyrics(currentTrack.artistName, currentTrack.title).then(setLyrics);
  }, [currentTrack]);

  if (!currentTrack) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Select a song to start listening.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentTrack.artworkUrl }} style={styles.artwork} />
      <Text style={styles.title}>{currentTrack.title}</Text>
      <Text style={styles.subtitle}>{currentTrack.artistName}</Text>

      <Slider
        minimumValue={0}
        maximumValue={durationMillis}
        value={positionMillis}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#1F1F1F"
        thumbTintColor="#1DB954"
        onSlidingComplete={seekTo}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>
        <Text style={styles.timeText}>{formatTime(durationMillis)}</Text>
      </View>

      <View style={styles.controls}>
        <Pressable style={styles.secondaryControl} onPress={toggleShuffle}>
          <Text style={styles.controlText}>{shuffle ? 'Shuffle On' : 'Shuffle'}</Text>
        </Pressable>
        <Pressable style={styles.primaryControl} onPress={playPrevious}>
          <Text style={styles.primaryText}>Prev</Text>
        </Pressable>
        <Pressable style={styles.primaryControl} onPress={playPause}>
          <Text style={styles.primaryText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </Pressable>
        <Pressable style={styles.primaryControl} onPress={playNext}>
          <Text style={styles.primaryText}>Next</Text>
        </Pressable>
        <Pressable style={styles.secondaryControl} onPress={toggleRepeat}>
          <Text style={styles.controlText}>{repeatMode === 'off' ? 'Repeat' : `Repeat ${repeatMode}`}</Text>
        </Pressable>
      </View>

      <Pressable style={styles.lyricsToggle} onPress={() => setShowLyrics(!showLyrics)}>
        <Text style={styles.lyricsToggleText}>{showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}</Text>
      </Pressable>

      {showLyrics ? (
        <ScrollView style={styles.lyricsContainer}>
          {lyrics.map((line, index) => (
            <Text key={`${line.time}-${index}`} style={styles.lyricsLine}>
              {line.text}
            </Text>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    padding: 24,
  },
  artwork: {
    width: '100%',
    height: 320,
    borderRadius: 20,
    marginBottom: 24,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    color: '#B3B3B3',
    marginBottom: 16,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
  primaryControl: {
    backgroundColor: '#1DB954',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  primaryText: {
    color: '#0B0B0B',
    fontWeight: '700',
  },
  secondaryControl: {
    borderWidth: 1,
    borderColor: '#1F1F1F',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  controlText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  lyricsToggle: {
    alignSelf: 'flex-start',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  lyricsToggleText: {
    color: '#FFFFFF',
  },
  lyricsContainer: {
    marginTop: 16,
  },
  lyricsLine: {
    color: '#B3B3B3',
    fontSize: 14,
    marginBottom: 8,
  },
  empty: {
    color: '#B3B3B3',
    textAlign: 'center',
    marginTop: 120,
  },
});
