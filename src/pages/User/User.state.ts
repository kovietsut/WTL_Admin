import { TUser, UserStoreState } from '@/interfaces/user';
import { SyntheticEvent, useMemo } from 'react';
import { create } from 'zustand';

export const tabs = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Author',
    value: 'author',
  },
  {
    label: 'Reader',
    value: 'reader',
  },
  {
    label: 'Translator',
    value: 'translator',
  },
];

export const useUsersIds = (users: TUser[] = []) => {
  return useMemo(() => {
    return users.map((user) => user.userId);
  }, [users]);
};

const initialState: UserStoreState = {
  currentTab: 'all',
  openDrawer: false,
  drawerMode: 'add',
};

export const useUserStore = create<UserStoreState>((set) => ({
  ...initialState,
  setCurrentTab: (event: SyntheticEvent, value: string) => {
    event.preventDefault();
    set({ currentTab: value });
  },
  setOpenDrawer(open) {
    set({ openDrawer: open });
  },
  setDrawerMode: (mode) => set({ drawerMode: mode }),
  setOpenPopover: (event) => set({ openPopover: event?.currentTarget }),
}));
