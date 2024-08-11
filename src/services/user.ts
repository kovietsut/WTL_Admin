import { TRequestUser, TResponseUserList } from '@/interfaces/user';
import { Endpoint } from '@/libs/helpers/endpoint';
import { useFetch } from '@/utils/reactQuery';

export const useFetchUser = (params: TRequestUser) => {
  return useFetch<TResponseUserList>(Endpoint.user.search, params);
};
