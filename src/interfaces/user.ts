import { SyntheticEvent } from 'react';
import { PaginationResponse } from './common/responseData';

//#region Response Data / List Data
export type TUser = {
  userId: number;
  isEnabled: boolean;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  avatarPath?: string;
  gender?: string;
  address?: string;
  roleId?: number;
  roleName?: string;
  createdAt?: string;
  modifiedAt?: string;
};

export type TUserWithId = Omit<TUser, 'userId'> & { id: number };

export type TResponseUser = {
  data?: TUserWithId;
};

export type TResponseUserList = PaginationResponse<TUser>;

export type TUserListParams = {
  pageNumber?: number;
  pageSize?: number;
  searchText?: string;
  roleId?: number;
};
//#endregion

//#region State
export type UserState = {
  currentTab?: string;
  openDrawer?: boolean;
  drawerMode: 'add' | 'edit' | 'detail';
  userId?: number;
  user?: TUserWithId;
};

export type UserEvent = {
  setCurrentTab?: (event: SyntheticEvent, value: string) => void;
  setOpenDrawer?: (open: boolean) => void;
  setDrawerMode?: (mode: 'add' | 'edit' | 'detail') => void;
  setUserId?: (userId: number) => void;
  setUser?: (user: TUserWithId) => void;
};

export type UserStoreState = UserState & UserEvent;
//#endregion

//#region Request / Response Update
export type TRequestUserCreate = Omit<TUser, 'userId' | 'isEnabled' | 'roleName'> & {};
export type TRequestUserUpdate = {};
export type TRequestUserDelete = {};

export type TResponseUserCreate = {};
export type TResponseUserUpdate = {};
export type TResponseUserDelete = {};
//#endregion
