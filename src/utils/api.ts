/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataResponse } from '@/interfaces/common/responseData';
import axios from './axios';
import authStore from '@/store/useAuth';

const getAuthToken = () => {
  const { credential } = authStore.getState();
  return credential?.data.tokenData.accessToken || null;
};

export const api = {
  get: <T>(url: string, params?: object) => {
    const token = getAuthToken();
    return axios.get<T, DataResponse<T>>(url, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
  post: <T>(url: string, data: any) => {
    const token = getAuthToken();
    return axios.post<T, DataResponse<T>>(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
  put: <T>(url: string, data: any) => {
    const token = getAuthToken();
    return axios.put<T, DataResponse<T>>(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
  patch: <T>(url: string, data: any) => {
    const token = getAuthToken();
    return axios.patch<T, DataResponse<T>>(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
  delete: <T>(url: string) => {
    const token = getAuthToken();
    return axios.delete<T, DataResponse<T>>(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
};
