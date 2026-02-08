import { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import { usePlayerStore } from '@/store/playerStore';
import { PlayerControls } from '@/components/PlayerControls';
import { LyricsPanel } from '@/components/LyricsPanel';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useOfflineCache } from '@/hooks/useOfflineCache';
import { LyricsLine } from '@/types';

const sampleLyrics: LyricsLine[] = [
  { time: 0, text: 'Feel the rhythm in the night' },
  { time: 5, text: 'Let the bassline guide your light' },
  { time: 10, text: 'Every beat pulls you closer' }
];

export const PlayerScreen = () => {
  const { currentTrack, isPlaying, shuffle, repeatMode, position, duration, setRepeatMode, toggleShuffle, setCurrentTrack } =
    usePlayerStore();
  const { togglePlayPause, handleNext, handlePrevious } = useAudioPlayer();
  const { downloadTrack, resolvePlaybackUrl } = useOfflineCache();
  const [showLyrics, setShowLyrics] = useState(false);

  useEffect(() => {
    const updateTrackUrl = async () => {
      if (!currentTrack) {
        return;
      }
      const resolvedUrl = await resolvePlaybackUrl(currentTrack);
      if (resolvedUrl !== currentTrack.audioUrl) {
        setCurrentTrack({ ...currentTrack, audioUrl: resolvedUrl });
      }
    };
    updateTrackUrl();
  }, [currentTrack, resolvePlaybackUrl, setCurrentTrack]);

  const progress = useMemo(() => {
    if (!duration) {
      return '0:00';
    }
    const minutes = Math.floor(position / 60);
    const seconds = Math.floor(position % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [position, duration]);

  if (!currentTrack) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Select a track to start listening.</Text>
      </View>
    );
  }

  const toggleRepeat = () => {
    const next = repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off';
    setRepeatMode(next);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentTrack.artworkUrl }} style={styles.artwork} />
      <Text style={styles.title}>{currentTrack.title}</Text>
      <Text style={styles.subtitle}>{currentTrack.artist}</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${duration ? (position / duration) * 100 : 0}%` }]} />
      </View>
      <View style={styles.progressMeta}>
        <Text style={styles.progressText}>{progress}</Text>
        <Text style={styles.progressText}>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</Text>
      </View>
      <PlayerControls
        isPlaying={isPlaying}
        shuffle={shuffle}
        repeatMode={repeatMode}
        onTogglePlay={togglePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onToggleShuffle={toggleShuffle}
        onToggleRepeat={toggleRepeat}
      />
      <View style={styles.actionsRow}>
        <Pressable style={styles.actionButton} onPress={() => downloadTrack(currentTrack)}>
          <Text style={styles.actionText}>Download</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={() => setShowLyrics((prev) => !prev)}>
          <Text style={styles.actionText}>{showLyrics ? 'Hide Lyrics' : 'Show Lyrics'}</Text>
        </Pressable>
      </View>
      {showLyrics && <LyricsPanel lines={sampleLyrics} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background
  },
  artwork: {
    width: '100%',
    height: 320,
    borderRadius: 24,
    marginBottom: spacing.lg,
    backgroundColor: colors.surfaceElevated
  },
  title: {
    color: colors.textPrimary,
    ...typography.title
  },
  subtitle: {
    color: colors.textSecondary,
    ...typography.body,
    marginBottom: spacing.md
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden'
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.accent
  },
  progressMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs
  },
  progressText: {
    color: colors.textSecondary,
    fontSize: 12
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg
  },
  actionButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md
  },
  actionText: {
    color: colors.textSecondary
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background
  },
  emptyText: {
    color: colors.textSecondary
  }
});
