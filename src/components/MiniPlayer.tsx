import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import { usePlayerStore } from '@/store/playerStore';

type MiniPlayerProps = {
  onPress: () => void;
  onTogglePlay: () => void;
};

export const MiniPlayer = ({ onPress, onTogglePlay }: MiniPlayerProps) => {
  const { currentTrack, isPlaying } = usePlayerStore();

  if (!currentTrack) {
    return null;
  }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.meta}>
        <Image source={{ uri: currentTrack.artworkUrl }} style={styles.artwork} />
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {currentTrack.artist}
          </Text>
        </View>
      </View>
      <Pressable onPress={onTogglePlay} style={styles.control}>
        <Text style={styles.controlText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: spacing.sm,
    backgroundColor: colors.surfaceElevated
  },
  title: {
    color: colors.textPrimary,
    ...typography.body,
    maxWidth: 180
  },
  subtitle: {
    color: colors.textSecondary,
    ...typography.caption
  },
  control: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.accent,
    borderRadius: 16
  },
  controlText: {
    color: colors.textPrimary,
    fontWeight: '600'
  }
});
