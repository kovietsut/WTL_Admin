import { ValidationSchema } from '@/interfaces/common/object';
import { TUser, UserStoreState } from '@/interfaces/user';
import { SyntheticEvent, useMemo } from 'react';
import { z } from 'zod';
import { create } from 'zustand';

export const genders = [
  {
    value: 'Male',
    label: 'Male',
  },
  {
    value: 'Female',
    label: 'Female',
  },
  {
    value: 'Others',
    label: 'Others',
  },
];

export const tabs = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'author',
    label: 'Author',
  },
  {
    value: 'reader',
    label: 'Reader',
  },
  {
    value: 'translator',
    label: 'Translator',
  },
];

export const roles = [
  {
    value: 1,
    label: 'Admin',
  },
  {
    value: 2,
    label: 'Author',
  },
  {
    value: 3,
    label: 'Reader',
  },
  {
    value: 4,
    label: 'Translator',
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
  setUserId: (userId) => set({ userId: userId }),
  setUser: (user) => set({ user: user }),
}));

export const validationCreateUserSchema: ValidationSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(8, 'Password is required'),
  address: z.string().min(1, 'Address is required'),
  fullName: z.string().min(1, 'Full Name is required'),
  gender: z.string().min(1, 'Gender is required'),
  phoneNumber: z.string().regex(/^0\d{9}$/, {
    message: 'Invalid Vietnam phone number. It should be 10 digits starting with a 0.',
  }),
  roleId: z.number().positive('Number must be positive'),
});

export const validationUpdateUserSchema: ValidationSchema = z.object({
  email: z.string().min(1, 'Email is required'),
  address: z.string().min(1, 'Address is required'),
  fullName: z.string().min(1, 'Full Name is required'),
  gender: z.string().min(1, 'Gender is required'),
  phoneNumber: z.string().regex(/^0\d{9}$/, {
    message: 'Invalid Vietnam phone number. It should be 10 digits starting with a 0.',
  }),
  roleId: z.number().positive('Number must be positive'),
});
