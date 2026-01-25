/**
 * Helper to determine the base URL for internal API calls.
 * Useful for server-side fetching where relative paths don't work.
 */
export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL.startsWith('http') 
      ? process.env.NEXT_PUBLIC_URL 
      : `https://${process.env.NEXT_PUBLIC_URL}`;
  }
  return 'http://localhost:3000';
};
