export type Company = {
  id: string;
  name: string;
  domain: string;
};

export type User = {
  firstName: string;
  lastName: string;
  employeeId: string;
};

export type PayStub = {
  id: string;
  /** ISO date (yyyy-MM-dd) */
  periodStart: string;
  periodEnd: string;
  payDate: string;
  netPay: number;
  grossPay: number;
  taxes: number;
  deductions: number;
  chequeNumber: string;
  employeeName: string;
  paymentMethod: 'Direct deposit' | 'Cheque';
  status: 'Deposited' | 'Pending';
  pdfUrl: string;
};

export type W2Document = {
  id: string;
  year: number;
  fileName: string;
  sizeLabel: string;
  pages: number;
  pdfUrl: string;
};

export type PayStubFilterPreset = '30d' | '3m' | 'ytd' | 'custom';

export type PayStubFilter = {
  preset: PayStubFilterPreset;
  /** ISO dates; only used when preset === 'custom' */
  startDate: string | null;
  endDate: string | null;
};

export type ThemeMode = 'light' | 'dark' | 'system';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
