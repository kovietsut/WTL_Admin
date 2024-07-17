import { ValidationSchema } from '@/interfaces/common/object';
import { Validation } from '@/shared/cmp/validation';
import { z } from 'zod';

export const validationSchema: ValidationSchema = z.object({
  email: Validation.email,
  password: Validation.password,
});
