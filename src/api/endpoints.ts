/** TODO: align with the real backend contract. */
export const ENDPOINTS = {
  findCompany: '/auth/company/lookup',
  verifyEmployeeId: '/auth/employee/verify',
  requestPin: '/auth/pin/request',
  verifyPin: '/auth/pin/verify',
  login: '/auth/login',
  payStubs: '/pay-stubs',
  payStub: (id: string) => `/pay-stubs/${id}`,
  w2Forms: '/w2-forms',
} as const;
