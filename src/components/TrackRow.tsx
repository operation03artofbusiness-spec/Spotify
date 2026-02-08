import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Track } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';

export const TrackRow = ({ track, onPress }: { track: Track; onPress?: () => void }) => {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={{ uri: track.artworkUrl }} style={styles.artwork} />
      <View style={styles.meta}>
        <Text style={styles.title} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {track.artist}
        </Text>
      </View>
      {track.isLiked && <Text style={styles.liked}>♥</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated
  },
  meta: {
    flex: 1,
    marginLeft: spacing.sm
  },
  title: {
    color: colors.textPrimary,
    ...typography.body
  },
  subtitle: {
    color: colors.textSecondary,
    ...typography.caption
  },
  liked: {
    color: colors.accent,
    fontSize: 16
  }
});
