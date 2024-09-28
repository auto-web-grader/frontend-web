/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { getToken, removeToken } from '@/lib/cookies';

import Forbidden from '@/components/Forbidden';

import useAuthStore from '@/store/useAuthStore';

import { User } from '@/types/entity/user';

export interface WithAuthProps {
  user: User;
}

const USER_ROUTE = '/';
const ADMIN_ROUTE = '/admin';
const LOGIN_ROUTE = '/auth/login';
// const { toast } = useToast();

export enum RouteRole {
  /**
   Dapat diakses hanya ketika user belum login (Umum)
   */
  public,
  /**
   * Dapat diakses semuanya
   */
  optional,
  /**
   * For all authenticated user
   * will push to login if user is not authenticated
   */
  user,
  /**
   * For all authenticated admin
   * will push to login if user is not authenticated
   */
  admin,
}

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<T>(
  Component: React.ComponentType<T>,
  routeRole: keyof typeof RouteRole,
  options: {
    withCache?: boolean;
  } = {
    withCache: true,
  }
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { query } = router;

    //#region  //*=========== STORE ===========
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    //#endregion  //*======== STORE ===========

    const checkAuth = React.useCallback(() => {
      const token = getToken();

      if (isAuthenticated || options.withCache) {
        // If the user is already authenticated or caching is enabled, get user details from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          login(parsedUser);
          stopLoading();
          return;
        }
      }

      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }
      const loadUser = async () => {
        try {
          // call local storage with useAuthStore in useUser
          const res = useAuthStore.useUser();
          if (!res) {
            throw new Error('Sesi login tidak valid');
          }

          const userData = {
            ...res,
            token: token,
          };

          login(userData);
        } catch (err) {
          logout();
          removeToken();
        } finally {
          stopLoading();
        }
      };

      if (!isAuthenticated || options.withCache) {
        loadUser();
      }
    }, [isAuthenticated, login, logout, stopLoading]);
    React.useEffect(() => {
      checkAuth();

      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    React.useEffect(() => {
      const Redirect = async () => {
        if (isAuthenticated) {
          // Jika ada user yang login akses public maka akan dipindah ke admin, user, atau forda
          if (routeRole === 'public') {
            if (query?.redirect) {
              router.replace(query.redirect as string);
            } else {
              if (user?.role === 'admin') {
                router.replace(
                  `${ADMIN_ROUTE}?redirect=${router.asPath}`,
                  `${ADMIN_ROUTE}`
                );
              } else {
                router.replace(
                  `${USER_ROUTE}?redirect=${router.asPath}`,
                  `${USER_ROUTE}`
                );
              }
            }
            // Admin
          }
          if (user?.role === 'student') {
            if (routeRole === 'admin') {
              router.replace(USER_ROUTE);
            }
          }
          if (user?.role === 'admin') {
            if (routeRole === 'user') {
              router.replace(ADMIN_ROUTE);
            }
          }
        } else {
          if (
            routeRole !== 'public' &&
            routeRole !== 'optional' &&
            routeRole !== 'admin' &&
            routeRole !== 'user'
          ) {
            router.replace(`${LOGIN_ROUTE}?redirect=${router.asPath}`);
          } else {
            if (
              routeRole !== 'public' &&
              routeRole !== 'optional' &&
              routeRole !== 'admin' &&
              routeRole !== 'user'
            ) {
              router.replace(`${LOGIN_ROUTE}?redirect=${router.asPath}`);
            } else if (routeRole === 'admin' || routeRole === 'user') {
              router.replace(`${LOGIN_ROUTE}?redirect=${router.asPath}`);
            }
          }
        }
      };

      if (!isLoading) {
        Redirect();
      }
    }, [isAuthenticated, isLoading, query, router, user]);

    if (isAuthenticated) {
      if (routeRole === 'admin' && user?.role !== 'admin') {
        return <Forbidden />;
      }
      if (routeRole === 'user' && user?.role !== 'student') {
        return <Forbidden />;
      }
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
