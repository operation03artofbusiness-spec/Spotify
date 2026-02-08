import { create } from 'zustand';
import NetInfo from '@react-native-community/netinfo';

type OfflineState = {
  isOffline: boolean;
  setOffline: (value: boolean) => void;
  monitorNetwork: () => void;
};

export const useOfflineStore = create<OfflineState>((set) => ({
  isOffline: false,
  setOffline: (value) => set({ isOffline: value }),
  monitorNetwork: () => {
    NetInfo.addEventListener((state) => {
      set({ isOffline: !(state.isConnected && state.isInternetReachable) });
    });
  },
}));
