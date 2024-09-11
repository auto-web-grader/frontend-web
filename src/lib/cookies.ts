import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const getCookie = () => {
  return cookie.get('session');
};

export const setToken = (token: string) => {
  cookie.set('connect.sid', token, {
    path: '/',
  });
};

export const removeToken = () => {
  cookie.remove('connect.sid', { path: '/' });
};
