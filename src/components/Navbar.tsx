'use client';
import Link from 'next/link';
import React from 'react';

import NextImage from '@/components/NextImage';

const Navbar = () => {
  return (
    <>
      <div className='w-screen h-20 sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
        <div className='container mx-auto px-4 h-full'>
          <div className='flex justify-between items-center h-full'>
            <ul className='hidden md:flex gap-x-6 text-dark items-center py-4'>
              <li>
                <NextImage
                  src='/images/logo_jatim.png'
                  alt='Logo Provinsi Jawa Timur'
                  width={40}
                  height={30}
                  priority
                />
              </li>
              <li>
                <Link href='/' className='text-xl font-bold'>
                  CPNS Jatim
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
