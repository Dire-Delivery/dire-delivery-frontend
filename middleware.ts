import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { removeUserProfile } from './actions/auth';

export async function middleware(request: NextRequest) {
  let token = request.cookies.get('token');
  let profie = request.cookies.get('profie');

  console.log("token", token)

  const now = Math.floor(Date.now() / 1000);

  if (token) {
    await removeUserProfile();
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token) {
    if (request.nextUrl.pathname != '/log-in') {
        const signInUrl = new URL('/log-in', request.url);
        return NextResponse.redirect(signInUrl);
      }

  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
  };