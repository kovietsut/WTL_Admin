// TODO: intl
import { z } from 'zod';

const email = z.string().email();
const password = z.string().min(8).max(20);

export type Email = z.infer<typeof email>;
export type Username = z.infer<typeof email>;
export type Password = z.infer<typeof password>;

export const Validation = Object.freeze({
  email,
  password,
});
