import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <>
      <div className='w-full h-16 sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 '>
        <div className='container mx-auto px-4 h-full'>
          <div className='flex justify-between items-center h-full'>
            <ul className='hidden md:flex gap-x-6 text-dark'>
              <li>
                <Link href='/' className='text-xl'>
                  Website
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
