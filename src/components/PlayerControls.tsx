import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/constants/theme';
import { RepeatMode } from '@/store/playerStore';

type PlayerControlsProps = {
  isPlaying: boolean;
  shuffle: boolean;
  repeatMode: RepeatMode;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
};

export const PlayerControls = ({
  isPlaying,
  shuffle,
  repeatMode,
  onTogglePlay,
  onNext,
  onPrevious,
  onToggleShuffle,
  onToggleRepeat
}: PlayerControlsProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onToggleShuffle}>
        <Text style={[styles.controlText, shuffle && styles.active]}>Shuffle</Text>
      </Pressable>
      <Pressable onPress={onPrevious}>
        <Text style={styles.controlText}>Prev</Text>
      </Pressable>
      <Pressable onPress={onTogglePlay} style={styles.playButton}>
        <Text style={styles.playText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </Pressable>
      <Pressable onPress={onNext}>
        <Text style={styles.controlText}>Next</Text>
      </Pressable>
      <Pressable onPress={onToggleRepeat}>
        <Text style={[styles.controlText, repeatMode !== 'off' && styles.active]}>
          Repeat {repeatMode === 'one' ? '1' : repeatMode === 'all' ? 'All' : 'Off'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg
  },
  controlText: {
    color: colors.textSecondary,
    fontSize: 12
  },
  active: {
    color: colors.accent
  },
  playButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: 24
  },
  playText: {
    color: colors.textPrimary,
    fontWeight: '700'
  }
});
