import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('connect.sid');
  const { pathname } = req.nextUrl;

  if (sessionToken && pathname.match('/auth/logout')) {
    const response = NextResponse.redirect(new URL('/auth/login', req.url));
    // const response = NextResponse.next();
    response.cookies.delete('connect.sid');

    return response;
  }

  // If there is no session token and the user is not already on the login or register pages
  if (!sessionToken && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  // If there is a session token and the user tries to access the login or register pages
  if (sessionToken && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    '/',
    '/admin',
    '/question-1',
    '/auth/login',
    '/auth/register',
    '/auth/logout',
  ], // Define the pages that should trigger the middleware
};
