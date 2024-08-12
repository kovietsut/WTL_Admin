import {
  TUserListParams,
  TResponseUserList,
  TRequestUserCreate,
  TResponseUserCreate,
  TResponseUserUpdate,
  TRequestUserUpdate,
  TRequestUserDelete,
  TResponseUser,
} from '@/interfaces/user';
import { Endpoint } from '@/libs/helpers/endpoint';
import { useDelete, useFetch, usePost, useUpdate } from '@/utils/reactQuery';

export const useFetchUser = (params: TUserListParams) => {
  return useFetch<TResponseUserList>(Endpoint.user.search, params);
};

export const useFetchUserById = (id?: number) => {
  return useFetch<TResponseUser>(`${Endpoint.user.root}/${id}`);
};

export const useUserCreate = () =>
  usePost<TRequestUserCreate, TResponseUserCreate>(Endpoint.user.root);

export const useUserUpdate = (id: number) =>
  useUpdate<TRequestUserUpdate, TResponseUserUpdate>(`${Endpoint.user.root}/${id}`);

export const useUserDelete = () => useDelete<TRequestUserDelete>(Endpoint.user.disable);
