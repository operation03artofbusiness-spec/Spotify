import { create } from 'zustand';
import { UserProfile } from '@/types';

type UserState = {
  user?: UserProfile;
  setUser: (user?: UserProfile) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user) => set({ user })
}));
