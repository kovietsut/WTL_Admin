import { create } from 'zustand';

type TLoadingState = {
  isLoading: boolean;
  counter: number;
};

type TLoadingEvent = {
  start: () => void;
  off: () => void;
  stop: () => void;
};

type TLoadingStore = TLoadingState & TLoadingEvent;

const initialState: TLoadingState = {
  isLoading: false,
  counter: 0,
};

const loadingStore = create<TLoadingStore>((set) => ({
  ...initialState,
  start: () => set((state) => ({ ...state, isLoading: true, counter: state.counter + 1 })),
  off: () =>
    set((state) => ({ ...state, isLoading: state.counter > 1, counter: state.counter - 1 })),
  stop: () => set((state) => ({ ...state, isLoading: false, counter: 0 })),
}));

export const useLoading = loadingStore;
