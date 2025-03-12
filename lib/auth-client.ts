import { createAuthClient } from 'better-auth/react';

const BASE_URL = process.env.API_URL;

export const authClient = createAuthClient({
  baseURL: BASE_URL, // the base url of your auth server
});
