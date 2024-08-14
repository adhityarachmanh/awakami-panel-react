export interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
  page?: PageInfo;
}

export type PageInfo = {
  total: number;
  size: number;
  totalPage: number;
  current: number;
};
