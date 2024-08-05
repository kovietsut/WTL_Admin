import { PaginationResponse } from './common/responseData';

export type TUser = {
  userId: number;
  isEnabled: boolean;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatarPath: string;
  gender: string;
  address: string;
  roleId: number;
  roleName: string;
};

export type TResponseUserList = PaginationResponse<TUser>;

export type TRequestUser = {
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
  roleId?: number;
};

export type UserStoreState = {
  users: TUser[];
  addUser: (user: TUser) => void;
  updateUser: (user: TUser) => void;
  removeUser: (userId: number) => void;
  setUsers: (users: TUser[]) => void;
};
