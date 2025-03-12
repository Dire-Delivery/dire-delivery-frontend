// app/actions/auth.ts
'use server';

import { cookies } from 'next/headers';

export async function setUserCookie(userData: User_Info) {
  const cookieStore = await cookies();
  console.log('the userData is', userData);
  // Set non-sensitive user data in separate cookie
  cookieStore.set({
    name: 'user',
    value: JSON.stringify(userData),

    // secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
    sameSite: 'lax',
  });
}

export async function setTokenCookie(token: string, maxAge: number) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
    maxAge, // ✅ Use the passed expiration time
    path: '/',
    sameSite: 'lax',
  });
}

export async function removeUserProfile() {
  const cookieStore = await cookies();

  cookieStore.delete('token');
  cookieStore.delete('profile');
}

export const userProfile = async () => {
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('user')?.value;
  console.log('the found userProfile', userProfile);
  const user: User_Info = userProfile && JSON.parse(userProfile);
  return user;
};
export const userToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return token;
};
