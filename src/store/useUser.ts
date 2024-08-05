import { UserStoreState } from '@/interfaces/user';
import { create } from 'zustand';

export const useUserStore = create<UserStoreState>((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (updatedItem) =>
    set((state) => ({
      users: state.users.map((user) => (user.userId === updatedItem.userId ? updatedItem : user)),
    })),
  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.userId !== id),
    })),
  setUsers: (users) => set(() => ({ users })),
}));
