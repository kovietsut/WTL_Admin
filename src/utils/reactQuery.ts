import { DataResponse } from '@/interfaces/common/responseData';
import { isDev } from '@/shared/cmp/logger';
import {
  QueryClient,
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { api } from './api';
import { TError } from '@/interfaces/common/object';

export type QueryKeyT = [string, object | undefined];

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: !isDev } },
});

const isSearch = (url: string) => url.includes('search');
export const fetcher = async <T>(
  { queryKey }: Omit<QueryFunctionContext<QueryKeyT>, 'meta'>,
  baseURL?: string
): Promise<T> => {
  const [url, params] = queryKey;
  const trigger = isSearch(url) ? api.post<T> : api.get<T>;
  return trigger(
    url,
    {
      ...params,
    },
    baseURL
  ).then((res) => res.data);
};

export const usePrefetch = <T>(url: string | null, params?: object, baseURL?: string) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery<T, Error, T, QueryKeyT>({
      queryKey: [url!, params],
      queryFn: ({ queryKey, signal }) => fetcher({ queryKey, signal }, baseURL),
    });
  };
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  baseURL?: string,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const context = useQuery<T, Error, T, QueryKeyT>({
    queryKey: [url!, params],
    queryFn: ({ queryKey, signal }) => fetcher({ queryKey, signal }, baseURL),
    enabled: !!url,
    ...config,
  });

  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S, baseURL?: string) => Promise<DataResponse<S>>,
  url: string,
  params?: object,
  baseURL?: string,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<DataResponse<S>, TError, T | S>({
    mutationFn: (data) => func(data, baseURL),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [url!, params] });

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], (oldData) =>
        updater ? updater(oldData!, data as S) : (data as T)
      );

      return previousData;
    },
    onError: (__, _, context) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [url!, params] });
    },
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  baseURL?: string,
  updater?: (oldData: T, id: string | number) => T
) =>
  useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`, baseURL),
    url,
    params,
    baseURL,
    updater
  );

export const useDeleteList = <T>(
  url: string,
  params?: object,
  baseURL?: string,
  updater?: (oldData: T, id: string | number) => T
) =>
  useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}?ids=${id}`, baseURL),
    url,
    params,
    baseURL,
    updater
  );

export const usePost = <T, S>(
  url: string,
  params?: object,
  baseURL?: string,
  updater?: (oldData: T, newData: S) => T
) =>
  useGenericMutation<T, S>(
    (data) => api.post<S>(url, data, baseURL),
    url,
    params,
    baseURL,
    updater
  );

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  baseURL?: string,
  updater?: (oldData: T, newData: S) => T
) =>
  useGenericMutation<T, S>((data) => api.put<S>(url, data, baseURL), url, params, baseURL, updater);
