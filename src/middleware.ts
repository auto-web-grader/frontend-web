import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('session');
  const { pathname } = req.nextUrl;

  // If there is no session token and the user is not already on the login or register pages
  if (!sessionToken && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // If there is a session token and the user tries to access the login or register pages
  if (sessionToken && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/login', '/auth/register'], // Define the pages that should trigger the middleware
};
