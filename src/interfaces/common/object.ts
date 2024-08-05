import { AxiosError } from 'axios';
import { ZodObject } from 'zod';

/* eslint-disable @typescript-eslint/no-explicit-any */
type IndexedObject = { [key: string]: any };
export type ValidationSchema = ZodObject<any>;
export type TState = {
  error?: string;
  isPending: boolean;
};

export default IndexedObject;

export type TValidationError = { name: string; message: string };

export interface TError extends Omit<AxiosError<string, unknown>, 'message'> {
  message?: string;
  errors?: TValidationError[];
}
