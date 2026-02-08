import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import NetInfo from '@react-native-community/netinfo';
import { Track } from '@/types';

const cacheDir = `${FileSystem.documentDirectory}track-cache/`;

export const useOfflineCache = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOffline(!state.isConnected);
    });
    return unsubscribe;
  }, []);

  const getCachedTrackUri = (track: Track) => `${cacheDir}${track.id}.mp3`;

  const ensureCacheDir = async () => {
    const dirInfo = await FileSystem.getInfoAsync(cacheDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(cacheDir, { intermediates: true });
    }
  };

  const downloadTrack = async (track: Track) => {
    await ensureCacheDir();
    const uri = getCachedTrackUri(track);
    const { exists } = await FileSystem.getInfoAsync(uri);
    if (exists) {
      return uri;
    }
    const result = await FileSystem.downloadAsync(track.audioUrl, uri);
    return result.uri;
  };

  const resolvePlaybackUrl = async (track: Track) => {
    if (!isOffline) {
      return track.audioUrl;
    }
    const uri = getCachedTrackUri(track);
    const { exists } = await FileSystem.getInfoAsync(uri);
    return exists ? uri : track.audioUrl;
  };

  return { isOffline, downloadTrack, resolvePlaybackUrl };
};
