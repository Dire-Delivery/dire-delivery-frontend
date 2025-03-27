// app/actions/auth.ts
'use server';

import apiCall from '@/base-api/api';
import { cookies } from 'next/headers';

const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function setCookies(data: any) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'token',
    value: data.token,
    httpOnly: true,
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
      path: '/',
      sameSite: 'lax',
    });
  } else {
    cookieStore.set({
      name: 'user',
      value: JSON.stringify(data.payload),
      httpOnly: true,
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

export const loginFetch = async (data: loginDetails) => {
  const fetchURl = `${BaseUrl}/auth/log-in`;
  const response = await apiCall({ url: fetchURl, method: 'POST', data: data });
  return response;
};

export const AddDetailsFetch = async (id: string, data: Details) => {
  const fetchURl = `${BaseUrl}/auth/${id}/sign-up`;
  const response = await apiCall({
    url: fetchURl,
    method: 'POST',
    data: data,
  });
  return response;
};

export const AddUserFetch = async (id: string, data: AddUserDetails) => {
  const fetchURl = `${BaseUrl}/auth/${id}/add-user`;
  const response = await apiCall({
    url: fetchURl,
    method: 'POST',
    data: data,
  });
  return response;
};

export const LogOutFetch = async (id: string) => {
  const fetchURl = `${BaseUrl}/auth/${id}/log-out`;
  const response = await apiCall({ url: fetchURl, method: 'GET' });
  return response;
};

export const ForgotPassword = async (data: ForgotPasswordData) => {
  const fetchURl = `${BaseUrl}/auth/forgot-password`;
  const response = await apiCall({ url: fetchURl, method: 'POST', data: data });
  return response;
};

export const ResetPassword = async (
  data: ResetPasswordData,
  forgotPwdToken: string
) => {
  const fetchURl = `${BaseUrl}/auth/reset-password/${forgotPwdToken}`;
  const response = await apiCall({ url: fetchURl, method: 'POST', data: data });
  return response;
};

export const RememberMe = async (userId: string) => {
  const cookieStore = await cookies();
  const fetchURl = `${BaseUrl}/auth/${userId}/remember-me`;
  const response = await apiCall({ url: fetchURl });
  cookieStore.set({
    name: 'token',
    value: response.token,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
  });
  return response;
};
