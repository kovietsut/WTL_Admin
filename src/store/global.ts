import { MAX_PAYLOAD } from '@/config';
import { TGlobalState, TGlobalStore } from '@/interfaces/global';
import { logger } from '@/utils/store.log';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const ALL_VERSION_ID = 'all';

const initialState: TGlobalState = {
  openThemeSetting: false,
};

const globalStore = create<TGlobalStore>()(
  persist(
    logger<TGlobalStore>((set, get) => ({
      ...initialState,
      toggleThemeSetting: () => set((state) => ({ openThemeSetting: !state.openThemeSetting })),
      setOpenThemeSetting: (value: boolean) => set(() => ({ openThemeSetting: value })),
    })),
    {
      name: 'app',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const initialSearchParam = {
  pageNumber: 1,
  pageSize: MAX_PAYLOAD,
  keyword: '',
  orderBy: [],
};
export default globalStore;

export const useGlobalStore = globalStore;
