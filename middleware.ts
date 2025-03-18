import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let token = request.cookies.get('token');
  let profile = request.cookies.get('profile');

  console.log("token", token?.value || "No token found");

  const now = Math.floor(Date.now() / 1000);

  if (!token && request.nextUrl.pathname != '/log-in') {
    const signInUrl = new URL('/log-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*', '/log-in','/owner/:path*', '/employee/:path*'],
}