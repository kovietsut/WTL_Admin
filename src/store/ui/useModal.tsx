import { create } from 'zustand';

type TModalState = {
  isVisible: boolean;
};

type TModalEvent = {
  show: () => void;
  hide: () => void;
};

type TModalStore = TModalState & TModalEvent;

const initialState: TModalState = {
  isVisible: false,
};

const modalStore = create<TModalStore>((set) => ({
  ...initialState,
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));

export const useModal = modalStore;
