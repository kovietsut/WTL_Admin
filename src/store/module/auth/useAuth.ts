import { TAuthCredential } from '@/interfaces/auth';
import { signIn } from '@/services/auth';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TAuthState = {
  credential: TAuthCredential | null;
  error: string | null;
  isLoading: boolean;
};

type TAuthEvent = {
  isAuthenticated: () => boolean;
  signIn: (username: string, password: string) => Promise<TAuthCredential | void>;
  signOut: () => void;
  reset: () => void;
};

type TAuthStore = TAuthState & TAuthEvent;

const initialState: TAuthState = {
  credential: null,
  error: null,
  isLoading: false,
};

const authStore = create<TAuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      isAuthenticated: () => Boolean(get().credential),
      signIn: async (username: string, password: string) => {
        const { data: response } = await signIn(username, password);
        const { isSuccess, data } = response;
        if (isSuccess && data) {
          set({ credential: data });
          return data;
        }
        if (response.message) {
          set({ error: response.message });
        }
      },
      reset: () => set({ ...initialState }),
      signOut: () => {
        get().reset();
      },
    }),

    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: TAuthStore) => ({
        credential: state.credential,
      }),
    }
  )
);

export const useAuth = authStore;
