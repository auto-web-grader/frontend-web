'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { getItemFromLocalStorage } from '@/lib/getLocalStorage';

import { DialogLogout } from '@/components/LogoutDialog';
import NextImage from '@/components/NextImage';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { User } from '@/types/entity/user';

const Navbar = () => {
  const router = useRouter(); // Initialize useRouter from next/navigation
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const userData: User | null | undefined =
      getItemFromLocalStorage<User>('user');
    setUser(userData);
  }, []);

  const isAuthenticated = user ? true : false;
  // Function to handle navigation to the login page
  const handleLoginClick = () => {
    router.push('/auth/login');
  };

  // Function to handle navigation based on question type
  const handleQuestionTypeClick = (type: number) => {
    router.push(`/question-${type}`);
  };

  return (
    <>
      <div className='w-full h-20 sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
        <div className='container mx-auto px-4 h-full w-[90%]'>
          <div className='flex justify-between items-center h-full'>
            <ul
              className='hidden md:flex gap-x-6 text-dark items-center py-4 '
              style={{ marginLeft: '0px' }}
            >
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
                <NavigationMenu
                  className='flex flex-row justify-end'
                  style={{ marginRight: '0px' }}
                >
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
                <div
                  className='flex gap-x-4 items-center'
                  style={{ marginRight: '0px' }}
                >
                  <Button>
                    <Link href='/auth/login'>Login</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline'>Tipe Soal</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-56'>
                      <DropdownMenuLabel>Tipe Soal</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        onClick={() => handleQuestionTypeClick(1)}
                      >
                        Pranata Komputer
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        onClick={() => handleQuestionTypeClick(2)}
                      >
                        Analisis Data
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
