import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth } from '../services/firebase';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  hydrateSession: () => void;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  hydrateSession: () => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      set({ user: currentUser, isLoading: false });
    });

    return unsubscribe;
  },
  signOut: async () => {
    await auth.signOut();
    set({ user: null });
  },
}));
