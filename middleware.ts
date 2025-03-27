import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { removeUserProfile } from './actions/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || null;
  const user = request.cookies.get('user')?.value || null;

  const now = Math.floor(Date.now() / 1000);

  // Decode token and check expiration
  if (token) {
    try {
      const decoded: { exp?: number } = jwtDecode(token);
      if (decoded.exp && decoded.exp < now) {
        console.log('Token expired');
        await removeUserProfile();
        return NextResponse.redirect(new URL('/log-in', request.url));
      }
    } catch (error) {
      console.error('Invalid token:', error);
      return NextResponse.redirect(new URL('/log-in', request.url)); 
    }
  }

  let userData = null;
  if (user) {
    try {
      userData = JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
      return NextResponse.redirect(new URL('/log-in', request.url)); // Prevent bad JSON from crashing
    }
  }

  // Redirect to log-in if no token or user is present
  if ((!token || !user) && request.nextUrl.pathname !== '/log-in') {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }

  if (user && token) {
    const userData = JSON.parse(user);

    // Role-based path restrictions
    if (
      (request.nextUrl.pathname.startsWith('/admin') &&
        userData.role !== 'ADMIN') ||
      (request.nextUrl.pathname.startsWith('/owner') &&
        userData.role !== 'OWNER') ||
      (request.nextUrl.pathname.startsWith('/employee') &&
        userData.role !== 'EMPLOYEE')
    ) {
      return NextResponse.redirect(new URL('/log-in', request.url));
    }

    // Redirect to role-specific dashboard if already logged in and visiting /log-in
    if (request.nextUrl.pathname === '/log-in') {
      if (userData.role === 'OWNER') {
        return NextResponse.redirect(new URL('/owner', request.url));
      } else if (userData.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url));
      } else if (userData.role === 'EMPLOYEE') {
        return NextResponse.redirect(new URL('/employee', request.url));
      }
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/log-in',
    '/owner/:path*',
    '/employee/:path*',
  ],
};
