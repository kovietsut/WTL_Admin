import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TVersionState = {
  version: string;
};
type TVersionEvent = {
  setVersion: (version: string) => void;
};

type TVersionStore = TVersionState & TVersionEvent;

const initialState: TVersionState = {
  version: '1',
};

const versionStore = create<TVersionStore>()(
  persist(
    (set) => ({
      ...initialState,
      setVersion: (version: string) => {
        set({ version });
      },
    }),

    {
      name: 'version',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state: TVersionStore) => ({
        version: state.version,
      }),
    }
  )
);

export const useVersion = versionStore;
