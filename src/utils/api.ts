/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataResponse } from '@/interfaces/common/responseData';
import axios from './axios';

export const api = {
  get: <T>(url: string, params?: object) => axios.get<T, DataResponse<T>>(url, params),
  post: <T>(url: string, data: any) => axios.post<T, DataResponse<T>>(url, data),
  put: <T>(url: string, data: any) => axios.put<T, DataResponse<T>>(url, data),
  patch: <T>(url: string, data: any) => axios.patch<T, DataResponse<T>>(url, data),
  delete: <T>(url: string) => axios.delete<T, DataResponse<T>>(url),
};
