import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LyricsLine } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';

export const LyricsPanel = ({ lines }: { lines: LyricsLine[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lyrics</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {lines.map((line) => (
          <Text key={`${line.time}-${line.text}`} style={styles.line}>
            {line.text}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16
  },
  title: {
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    ...typography.subtitle
  },
  line: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    ...typography.body
  }
});
