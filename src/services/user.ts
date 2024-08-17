import { USER_URL } from '@/config';
import {
  TRequestUserCreate,
  TRequestUserDelete,
  TRequestUserUpdate,
  TResponseUser,
  TResponseUserCreate,
  TResponseUserList,
  TResponseUserUpdate,
  TUserListParams,
} from '@/interfaces/user';
import { Endpoint } from '@/libs/helpers/endpoint';
import { useDeleteList, useFetch, usePost, useUpdate } from '@/utils/reactQuery';

export const useFetchUser = (params: TUserListParams) => {
  return useFetch<TResponseUserList>(Endpoint.user.search, params, USER_URL);
};

export const useFetchUserById = (id?: number) => {
  return useFetch<TResponseUser>(`${Endpoint.user.root}/${id}`, undefined, USER_URL);
};

export const useUserCreate = () =>
  usePost<TRequestUserCreate, TResponseUserCreate>(Endpoint.user.root, undefined, USER_URL);

export const useUserUpdate = (id?: number) =>
  useUpdate<TRequestUserUpdate, TResponseUserUpdate>(
    `${Endpoint.user.root}/${id}`,
    undefined,
    USER_URL
  );

export const useUserDeleteList = (ids: string) =>
  useDeleteList<TRequestUserDelete>(Endpoint.user.deleteList, undefined, USER_URL);
