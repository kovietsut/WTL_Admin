import { ValidationSchema } from '@/interfaces/common/object';
import { Validation } from '@/shared/cmp/validation';
import { z } from 'zod';

export const validationSchema: ValidationSchema = z.object({
  username: Validation.username,
  password: Validation.password,
});
