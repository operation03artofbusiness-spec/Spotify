import { openDB } from 'idb';

const DB_NAME = 'pulse-cache';
const STORE_NAME = 'tracks';

const getDb = () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    }
  });

export const cacheTrackForOffline = async (trackId: string, url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const db = await getDb();
  await db.put(STORE_NAME, blob, trackId);
};

export const getCachedTrackUrl = async (trackId: string) => {
  const db = await getDb();
  const blob = await db.get(STORE_NAME, trackId);
  if (!blob) return null;
  return URL.createObjectURL(blob as Blob);
};
