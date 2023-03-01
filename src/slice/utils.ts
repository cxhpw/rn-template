import { StateCreator } from 'zustand';

export type isOnlineSlice = {
  isOnline: boolean;
  setNetwork: (n: boolean) => void;
};
export const createisOnlineSlice: StateCreator<isOnlineSlice> = set => ({
  isOnline: false,
  setNetwork: state => set({ isOnline: state }),
});
