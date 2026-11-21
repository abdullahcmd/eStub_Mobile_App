import axios from 'axios';

/** Normalises any thrown value into a user-facing message. */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as {message?: string} | undefined)?.message ??
      'Network error. Please check your connection and try again.'
    );
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
};
