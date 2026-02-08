import * as FileSystem from 'expo-file-system';
import { Song } from '../types/music';

const cacheDir = `${FileSystem.cacheDirectory}tracks/`;

const ensureCacheDir = async () => {
  const dirInfo = await FileSystem.getInfoAsync(cacheDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
  }
};

export const getCachedAudioUri = async (trackId: string) => {
  await ensureCacheDir();
  const fileUri = `${cacheDir}${trackId}.mp3`;
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  return fileInfo.exists ? fileUri : null;
};

export const cacheAudioTrack = async (track: Song) => {
  await ensureCacheDir();
  const fileUri = `${cacheDir}${track.id}.mp3`;
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (fileInfo.exists) return fileUri;

  const download = await FileSystem.downloadAsync(track.audioUrl, fileUri);
  return download.uri;
};
