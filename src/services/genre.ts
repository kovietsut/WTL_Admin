import {
  TGenreListParams,
  TResponseGenreList,
  TRequestGenreCreate,
  TResponseGenreCreate,
  TResponseGenreUpdate,
  TRequestGenreUpdate,
  TRequestGenreDelete,
  TResponseGenre,
} from '@/interfaces/genre';
import { Endpoint } from '@/libs/helpers/endpoint';
import { useDeleteList, useFetch, usePost, useUpdate } from '@/utils/reactQuery';

export const useFetchGenre = (params: TGenreListParams) => {
  return useFetch<TResponseGenreList>(Endpoint.genre.search, params);
};

export const useFetchGenreById = (id?: number) => {
  return useFetch<TResponseGenre>(`${Endpoint.genre.root}/${id}`);
};

export const useGenreCreate = () =>
  usePost<TRequestGenreCreate, TResponseGenreCreate>(Endpoint.genre.root);

export const useGenreUpdate = (id?: number) =>
  useUpdate<TRequestGenreUpdate, TResponseGenreUpdate>(`${Endpoint.genre.root}/${id}`);

export const useGenreDeleteList = (ids: string) =>
  useDeleteList<TRequestGenreDelete>(Endpoint.genre.deleteList);
