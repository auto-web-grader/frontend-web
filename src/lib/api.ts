import axios, { AxiosError } from 'axios';

import { UninterceptedApiError } from '@/types/api';

// export const baseURL =
//   process.env.NEXT_PUBLIC_RUN_MODE === 'local'
//     ? process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL
//     : process.env.NEXT_PUBLIC_RUN_MODE === 'vercel'
//     ? process.env.NEXT_PUBLIC_BACKEND_URL_VERCEL
//     : process.env.NEXT_PUBLIC_RUN_MODE === 'production'
//     ? process.env.NEXT_PUBLIC_BACKEND_URL_PROD
//     : process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL;

export const baseURL = 'http://localhost:4000/';
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.defaults.withCredentials = true;

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // parse error
    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);
export default api;
