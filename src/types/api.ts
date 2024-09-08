export type UninterceptedApiError = {
  code: number;
  status: boolean;
  message: string | Record<string, string[]>;
};

export type ApiReturn<T> = {
  message: string;
  status: boolean;
  code: number;
  data: T;
};

export type ApiError = {
  code: number;
  status: boolean | number;
  message: string;
};

type PaginateData<Data> = {
  data_per_page: Data;
  metadata: {
    page_number: number;
    page_size: number;
    max_page: number;
  };
};

export interface PaginatedApiResponse<DataType> {
  code: number;
  status: boolean;
  message: string;
  data: PaginateData<DataType>;
}
