import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';

type MediaCardProps = {
  title: string;
  subtitle: string;
  artworkUrl: string;
  onPress?: () => void;
};

export const MediaCard = ({ title, subtitle, artworkUrl, onPress }: MediaCardProps) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: artworkUrl }} style={styles.artwork} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: spacing.md
  },
  artwork: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginBottom: spacing.sm,
    backgroundColor: colors.surfaceElevated
  },
  title: {
    color: colors.textPrimary,
    ...typography.subtitle
  },
  subtitle: {
    color: colors.textSecondary,
    ...typography.caption
  }
});
