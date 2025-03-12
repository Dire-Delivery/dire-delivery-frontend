'use server';

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
}: {
  url: string;
  method?: string;
  data?: unknown;
}) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: '', // Add token here if needed
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    });

    // Check if the response is JSON
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      if (!response.ok) {
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
