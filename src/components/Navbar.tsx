'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { getItemFromLocalStorage } from '@/lib/getLocalStorage';

import { DialogLogout } from '@/components/LogoutDialog';
import NextImage from '@/components/NextImage';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { User } from '@/types/entity/user';

const Navbar = () => {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith('/auth');

  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const userData: User | null | undefined =
      getItemFromLocalStorage<User>('user');
    setUser(userData);
  }, []);

  const isAuthenticated = user ? true : false;
  return (
    <>
      <div className='w-full h-20 sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
        <div className='container mx-auto px-4 h-full w-[90%]'>
          <div className='flex justify-between items-center h-full'>
            <ul className='hidden md:flex gap-x-6 text-dark items-center py-4'>
              <li>
                {/* <NextImage
                  src='/images/logo_jatim.png'
                  alt='Logo Provinsi Jawa Timur'
                  width={40}
                  height={30}
                  priority
                /> */}
                <NextImage
                  src='/images/logo_its.png'
                  alt='Logo ITS'
                  width={50}
                  height={40}
                  priority
                />
              </li>
              <li>
                <Link href='/' className='text-xl font-bold'>
                  Algoritma Dan Pemrograman ITS
                </Link>
              </li>
            </ul>
            {!isAuthPage &&
              (isAuthenticated ? (
                <NavigationMenu className='flex flex-row justify-end'>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        Hi! {user?.name}
                      </NavigationMenuTrigger>

                      <NavigationMenuContent>
                        <ul className='h-max'>
                          <DialogLogout />
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Button>
                  <Link href='/auth/login'>Login</Link>
                </Button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
