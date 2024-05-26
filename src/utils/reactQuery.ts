import { api } from './api';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  QueryFunctionContext,
  QueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

type QueryKeyT = [string, object | undefined];

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
});

export const fetcher = async <T>({
  queryKey,
  pageParam,
}: Omit<QueryFunctionContext<QueryKeyT>, 'meta'>): Promise<T> => {
  const [url, params] = queryKey;
  return api.get<T>(url, { params: { ...params, pageParam } }).then((res) => res.data);
};

export const usePrefetch = <T>(url: string | null, params?: object) => {
  const queryClient = useQueryClient();

  return () => {
    if (!url) {
      return;
    }

    queryClient.prefetchQuery<T, Error, T, QueryKeyT>([url!, params], ({ queryKey }) =>
      fetcher({ queryKey })
    );
  };
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const context = useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
    ({ queryKey }) => fetcher({ queryKey }),
    {
      enabled: !!url,
      ...config,
    }
  );

  return context;
};

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([url!, params]);

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
      queryClient.invalidateQueries([url!, params]);
    },
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T
) =>
  useGenericMutation<T, string | number>((id) => api.delete(`${url}/${id}`), url, params, updater);

export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => useGenericMutation<T, S>((data) => api.post<S>(url, data), url, params, updater);

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => useGenericMutation<T, S>((data) => api.put<S>(url, data), url, params, updater);
