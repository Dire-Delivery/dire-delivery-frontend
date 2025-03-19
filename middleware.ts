import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { removeUserProfile } from './actions/auth';

export async function middleware(request: NextRequest) {
  let token = request.cookies.get('token')?.value || null;
  let user = request.cookies.get('user')?.value || null;

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


  if ((!token || !user) && request.nextUrl.pathname != '/log-in') {
    const signInUrl = new URL('/log-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  if (user && token && request.nextUrl.pathname === '/log-in') {
    const userData = JSON.parse(user);
    if (userData.role == "OWNER") {
      const ownerUrl = new URL('/owner', request.url);
      return NextResponse.redirect(ownerUrl);
    } else if (userData.role == "ADMIN") {
      const adminUrl = new URL('/admin', request.url);
      return NextResponse.redirect(adminUrl);
    } else if (userData.role == "EMPLOYEE") {
      const employeeUrl = new URL('/employee', request.url);
      return NextResponse.redirect(employeeUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/log-in','/owner/:path*', '/employee/:path*'],
}