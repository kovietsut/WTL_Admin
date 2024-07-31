import { TAuthCredential, TAuthState, TAuthStore } from '@/interfaces/auth';
import axios from '@/utils/axios';
import { logger } from '@/utils/store.log';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const initialState: TAuthState = {
  credential: null,
};

const authStore = create<TAuthStore>()(
  persist(
    logger<TAuthStore>((set, get) => ({
      ...initialState,
      isAuthenticated: () => Boolean(get().credential),
      setCredential: (value: TAuthCredential) => {
        if (value?.token) {
          axios.defaults.headers.common.Authorization = `Bearer ${value.token}`;
        } else {
          delete axios.defaults.headers.common.Authorization;
        }
        set({ credential: value });
      },
      reset: () => set({ ...initialState }),
      signOut: () => get().reset(),
    })),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: TAuthStore) => ({
        credential: state.credential,
      }),
    }
  )
);

export default authStore;
