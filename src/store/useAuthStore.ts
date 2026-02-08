'use client';

import { create } from 'zustand';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  User
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { useToastStore } from './useToastStore';

interface AuthState {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => () => void;
}

const notifyMissingConfig = () => {
  useToastStore.getState().pushToast('Add Firebase env vars to enable authentication.');
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signInWithGoogle: async () => {
    if (!auth || !isFirebaseConfigured) return notifyMissingConfig();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  },
  signInWithEmail: async (email, password) => {
    if (!auth || !isFirebaseConfigured) return notifyMissingConfig();
    await signInWithEmailAndPassword(auth, email, password);
  },
  signUpWithEmail: async (email, password) => {
    if (!auth || !isFirebaseConfigured) return notifyMissingConfig();
    await createUserWithEmailAndPassword(auth, email, password);
  },
  signOut: async () => {
    if (!auth || !isFirebaseConfigured) return notifyMissingConfig();
    await firebaseSignOut(auth);
  },
  initialize: () => {
    if (!auth || !isFirebaseConfigured) {
      set({ loading: false });
      return () => undefined;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
    return unsubscribe;
  }
}));
