import axios from 'axios';

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

// api.interceptors.request.use(async (config) => {});

api.interceptors.response.use(
  async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default api;
