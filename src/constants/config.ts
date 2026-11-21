export const config = {
  /** TODO: load from env (react-native-config) per build variant. */
  API_BASE_URL: 'https://api.estubs.com',
  API_TIMEOUT_MS: 15000,
  /** When true, services resolve from src/api/mocks instead of the network. */
  USE_MOCKS: true,
  MOCK_LATENCY_MS: 600,
  SPLASH_MIN_DURATION_MS: 1500,
  PIN_LENGTH: 6,
  PIN_EXPIRY_SECONDS: 300,
  PAY_STUBS_PAGE_SIZE: 10,
  APP_VERSION: '4.0.0',
  APP_BUILD: '408',
  SUPPORT_EMAIL: 'payroll-support@estubs.com',
} as const;
