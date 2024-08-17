import { USER_URL } from '@/config';
import { TAuthCredential } from '@/interfaces/auth';
import { TRequestLogin } from '@/interfaces/login';
import { Endpoint } from '@/libs/helpers/endpoint';
import { usePost } from '@/utils/reactQuery';

export const useLogin = () =>
  usePost<TRequestLogin, TAuthCredential>(Endpoint.auth.signIn, undefined, USER_URL);
