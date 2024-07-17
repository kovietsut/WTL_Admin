import { Password, Username } from '@/shared/cmp/validation';

export type LoginFormData = {
  email: Username;
  password: Password;
};

export type LoginFormProps = LoginFormData & {
  afterSubmit?: string;
};
