import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { removeUserProfile } from './actions/auth';

export async function middleware(request: NextRequest) {
  let token = request.cookies.get('token')?.value || null;
  let profile = request.cookies.get('profile')?.value || null;

  const now = Math.floor(Date.now() / 1000);

  // Decode token and check expiration
  // Decode token and check expiration
  if (token) {
    try {
      const decoded: { exp?: number } = jwtDecode(token);
      console.log("compare the tow", decoded.exp, now)
      if (decoded.exp && decoded.exp < now) {
        console.log("Token expired");
        removeUserProfile();
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }


  if ((!token || !profile) && request.nextUrl.pathname != '/log-in') {
    const signInUrl = new URL('/log-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/log-in','/owner/:path*', '/employee/:path*'],
}