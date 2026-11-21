import {config} from '@/constants/config';

export const mockDelay = <T>(value: T, ms = config.MOCK_LATENCY_MS): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(value), ms));

export const mockReject = (message: string, ms = config.MOCK_LATENCY_MS) =>
  new Promise<never>((_, reject) => setTimeout(() => reject(new Error(message)), ms));
