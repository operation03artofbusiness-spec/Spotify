import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

type MediaCardProps = {
  title: string;
  subtitle?: string;
  imageUrl: string;
  onPress?: () => void;
};

export default function MediaCard({ title, subtitle, imageUrl, onPress }: MediaCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 16,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  subtitle: {
    color: '#B3B3B3',
    fontSize: 12,
  },
});
