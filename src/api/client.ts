import axios from 'axios';
import {config} from '@/constants/config';

export const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT_MS,
  headers: {'Content-Type': 'application/json'},
});

let authToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

/** Registered by the store to avoid a circular import (store -> api -> store). */
export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

apiClient.interceptors.request.use(req => {
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`;
  }
  return req;
});

apiClient.interceptors.response.use(
  res => res,
  error => {
    if (error?.response?.status === 401 && authToken) {
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);
