import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from './firebase';
import { Artist, Playlist, Track } from '@/types';

export const fetchTrendingPlaylists = async (): Promise<Playlist[]> => {
  const snapshot = await getDocs(query(collection(db, 'playlists'), orderBy('followers', 'desc'), limit(8)));
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<Playlist, 'id'>) }));
};

export const fetchRecommendedTracks = async (): Promise<Track[]> => {
  const snapshot = await getDocs(query(collection(db, 'tracks'), orderBy('popularity', 'desc'), limit(10)));
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<Track, 'id'>) }));
};

export const fetchRecentlyPlayed = async (userId: string): Promise<Track[]> => {
  const snapshot = await getDocs(query(collection(db, 'users', userId, 'recentlyPlayed'), orderBy('playedAt', 'desc'), limit(12)));
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<Track, 'id'>) }));
};

export const searchContent = async (term: string): Promise<{ tracks: Track[]; artists: Artist[] }> => {
  const tracksSnapshot = await getDocs(query(collection(db, 'tracks'), where('keywords', 'array-contains', term.toLowerCase())));
  const artistsSnapshot = await getDocs(query(collection(db, 'artists'), where('keywords', 'array-contains', term.toLowerCase())));
  return {
    tracks: tracksSnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<Track, 'id'>) })),
    artists: artistsSnapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<Artist, 'id'>) }))
  };
};

export const fetchArtistProfile = async (artistId: string): Promise<Artist> => {
  const snapshot = await getDoc(doc(db, 'artists', artistId));
  return { id: snapshot.id, ...(snapshot.data() as Omit<Artist, 'id'>) };
};

export const fetchArtistTracks = async (artistId: string): Promise<Track[]> => {
  const snapshot = await getDocs(query(collection(db, 'tracks'), where('artistId', '==', artistId)));
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...(docSnap.data() as Omit<Track, 'id'>) }));
};

export const createPlaylist = async (playlist: Playlist): Promise<void> => {
  await setDoc(doc(db, 'playlists', playlist.id), playlist);
  await setDoc(doc(db, 'users', playlist.ownerId, 'playlists', playlist.id), playlist);
};

export const updatePlaylist = async (playlistId: string, ownerId: string, data: Partial<Playlist>): Promise<void> => {
  await updateDoc(doc(db, 'playlists', playlistId), data);
  await updateDoc(doc(db, 'users', ownerId, 'playlists', playlistId), data);
};

export const deletePlaylist = async (playlistId: string, ownerId: string): Promise<void> => {
  await deleteDoc(doc(db, 'playlists', playlistId));
  await deleteDoc(doc(db, 'users', ownerId, 'playlists', playlistId));
};

export const toggleTrackInPlaylist = async (
  playlistId: string,
  ownerId: string,
  trackId: string,
  action: 'add' | 'remove'
): Promise<void> => {
  const payload = action === 'add' ? arrayUnion(trackId) : arrayRemove(trackId);
  await updateDoc(doc(db, 'playlists', playlistId), { trackIds: payload });
  await updateDoc(doc(db, 'users', ownerId, 'playlists', playlistId), { trackIds: payload });
};

export const followArtist = async (userId: string, artistId: string): Promise<void> => {
  await setDoc(doc(db, 'users', userId, 'following', artistId), { followedAt: new Date().toISOString() });
};

export const unfollowArtist = async (userId: string, artistId: string): Promise<void> => {
  await deleteDoc(doc(db, 'users', userId, 'following', artistId));
};
