export interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
  page?: { total: number; size: number; totalPage: number; current: number };
}
