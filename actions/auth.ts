// app/actions/auth.ts
'use server';

import { cookies } from 'next/headers';

export async function setCookies(
  data: any,
  maxAge = 60 * 60 * 24
) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'token',
    value: data.token,
    httpOnly: true,
    maxAge : maxAge, // ✅ Use the passed expiration time
    path: '/',
    sameSite: 'lax',
  });

  if (typeof data.payload === 'string') {
    const user = {
      id: data.payload,
    };

    cookieStore.set({
      name: 'user',
      value: JSON.stringify(user),
      httpOnly: true,
      maxAge : maxAge, // ✅ Use the passed expiration time
      path: '/',
      sameSite: 'lax',
    });
  } else {
    cookieStore.set({
      name: 'user',
      value: JSON.stringify(data.payload),
      httpOnly: true,
      maxAge, // ✅ Use the passed expiration time
      path: '/',
      sameSite: 'lax',
    });
  }
}

export async function removeUserProfile() {
  const cookieStore = await cookies();

  cookieStore.delete('token');
  cookieStore.delete('user');
}

export const userProfile = async () => {
  const cookieStore = await cookies();
  const userProfile = cookieStore.get('user')?.value;
  const user: User_Info = userProfile && JSON.parse(userProfile);
  return user;
};
export const userToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  return token;
};
