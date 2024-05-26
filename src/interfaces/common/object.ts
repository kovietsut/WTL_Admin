import { ZodObject } from 'zod';

/* eslint-disable @typescript-eslint/no-explicit-any */
type IndexedObject = { [key: string]: any };
export type ValidationSchema = ZodObject<any>;
export type TState = {
  error?: string;
  isLoading: boolean;
};

export default IndexedObject;
