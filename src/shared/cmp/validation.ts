// TODO: intl
import { z } from 'zod';

const email = z.string().email();
const username = z.string().min(6).max(32);
const password = z.string().min(8).max(20);

export type Email = z.infer<typeof email>;
export type Username = z.infer<typeof username>;
export type Password = z.infer<typeof password>;

export const Validation = Object.freeze({
  email,
  password,
  username,
});
