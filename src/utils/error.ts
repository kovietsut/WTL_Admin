/* eslint-disable @typescript-eslint/no-explicit-any */
import { TError } from '@/interfaces/common/object';
import { UseFormReturn } from 'react-hook-form';

export const isTargetError = (error: TError | null, target: string): boolean => {
  if (!error?.errors || !isValidationError(error)) return false;

  return error.errors.some((item) => item.name.toLowerCase() === target.toLowerCase());
};
export const isValidationError = (error: TError | null): boolean => {
  return error?.status === 400 && error?.code === '12001';
};

export const getTargetErrorMessage = (error: TError | null, target: string): string => {
  if (error?.errors?.length && isValidationError(error)) {
    const targetError = error.errors.find((item) => item.name === target);
    if (targetError) return targetError.message;
  }
  return '';
};

export const isAttributeError = (error: TError | null): boolean => {
  return !isValidationError(error) && error?.status === 400;
};

export function fillServerError(formMethods: UseFormReturn<any, any>, error: TError): void {
  formMethods.clearErrors();
  if (!error?.errors?.length) return;
  error.errors.forEach(({ name: key, message }) => {
    formMethods.setError(key as any, {
      type: 'manual',
      message: message,
    });
  });
}
