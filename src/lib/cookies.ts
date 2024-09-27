import Cookies from 'universal-cookie';

const cookie = new Cookies();
export const getToken = () => {
  return cookie.get('auth_session');
};

export const setToken = (token: string) => {
  cookie.set('auth_session', token, {
    path: '/',
  });
};

export const removeToken = () => {
  cookie.remove('auth_session', { path: '/' });
};
