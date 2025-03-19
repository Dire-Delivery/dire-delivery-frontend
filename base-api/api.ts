'use server';

import { userToken } from "@/actions/auth";

interface CustomError {
  message: string;
  response: {
    data: unknown;
  };
}

export default async function apiCall({
  url,
  method = 'GET',
  data = [],
  token = ''
}: {
  url: string;
  method?: string;
  data?: unknown;
  token?: string;
}) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '', // Add token here if needed
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    });

    console.log({response, token, auth: token ? `Bearer ${token}` : '', data})

    // Check if the response is JSON
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      if (!response.ok && !responseData.token) {
        if (responseData)
        throw new Error(responseData?.error?.message || 'Something went wrong');
      }
      return responseData;
    } else {
      // Handle non-JSON responses (e.g., plain text)
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || 'Something went wrong');
      }
      return text;
    }
  } catch (error: unknown) {
    const errorMessage =
      (error as CustomError)?.message || 'An unexpected error occurred';
    if (errorMessage === 'Invalid or expired token') {
      // Handle token expiration (e.g., logout)
      // logoutAction();
    }
    return {
      error: {
        title: 'Error!',
        description: errorMessage,
        duration: 3000,
      },
    };
  }
}
