import { SyntheticEvent } from 'react';
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

export type UserEvent = {
  currentTab?: string;
  openDrawer?: boolean;
  drawerMode: 'add' | 'edit' | 'detail';
  openPopover?: HTMLElement;
};

export type UserState = {
  setCurrentTab?: (event: SyntheticEvent, value: string) => void;
  setOpenDrawer?: (open: boolean) => void;
  setDrawerMode?: (mode: 'add' | 'edit' | 'detail') => void;
  setOpenPopover?: (event: React.MouseEvent<HTMLElement> | null) => void;
};

export type UserStoreState = UserEvent & UserState;
