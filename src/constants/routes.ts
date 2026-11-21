/** Route name constants — never hard-code route strings in screens. */
export const ROUTES = {
  // Root stack
  Splash: 'Splash',
  Auth: 'Auth',
  Main: 'Main',
  PayStubDetail: 'PayStubDetail',
  W2Viewer: 'W2Viewer',
  EmployeeIdHelpSheet: 'EmployeeIdHelpSheet',
  DateFilterSheet: 'DateFilterSheet',
  LogoutSheet: 'LogoutSheet',
  // Auth stack
  FindCompany: 'FindCompany',
  EmployeeId: 'EmployeeId',
  VerifyPin: 'VerifyPin',
  Password: 'Password',
  // Main tabs
  Home: 'Home',
  PayStubs: 'PayStubs',
  W2Forms: 'W2Forms',
  Profile: 'Profile',
} as const;
