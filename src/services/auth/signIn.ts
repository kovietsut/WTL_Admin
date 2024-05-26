import { TAuthCredential } from '@/interfaces/auth';
import { DataResponse } from '@/interfaces/common/responseData';
import { Endpoint } from '@/libs/helpers/endpoint';
import { api } from '@/utils/api';

export const signIn = (username: string, password: string) =>
  api.post<DataResponse<TAuthCredential>>(Endpoint.auth.signIn, { username, password });
