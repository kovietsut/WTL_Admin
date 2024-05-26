export interface DataResponse<T> {
  isSuccess: boolean;
  message: string | null;
  data: T | null;
}
