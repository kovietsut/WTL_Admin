import { AxiosResponse } from 'axios';

type TValidationError = {
  name: string;
  message: string;
};

export interface DataResponse<T = unknown> extends AxiosResponse<T> {
  status: number;
  code: string | null;
  message: string | null;
  data: T;
  errors: TValidationError[] | null;
}

export type PaginationResponse<T> = {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
