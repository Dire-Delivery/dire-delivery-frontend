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
        Authorization: '', //once we have a token we can add it here `Bearer ${token || ''}`
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData?.error.message || 'Something went wrong');
    }
    return responseData;
  } catch (error: unknown) {
    const errorMessage =
      (error as CustomError)?.message || 'An unexpected error occurred';
    // Call onError callback if provided
    //if (onError) onError(errorMessage);
    if (errorMessage === 'Invalid or expired token') {
      //logoutAction();
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
