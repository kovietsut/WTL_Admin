import { Email, Password } from '@/shared/cmp/validation';

export type LoginFormData = {
  email: Email;
  password: Password;
};

export type LoginFormProps = LoginFormData;

export type TRequestLogin = LoginFormData;
