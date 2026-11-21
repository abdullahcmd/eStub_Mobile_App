import {PayStub, W2Document} from '@/types';

const SAMPLE_PDF = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

export const MOCK_PIN = '123456';

export const mockPayStubs: PayStub[] = [
  {
    id: 'ps-008419',
    periodStart: '2026-08-01',
    periodEnd: '2026-08-15',
    payDate: '2026-08-15',
    netPay: 2486.32,
    grossPay: 3420.0,
    taxes: 612.48,
    deductions: 321.2,
    chequeNumber: '#008419',
    employeeName: 'Jordan Taylor',
    paymentMethod: 'Direct deposit',
    status: 'Deposited',
    pdfUrl: SAMPLE_PDF,
  },
  {
    id: 'ps-008367',
    periodStart: '2026-07-16',
    periodEnd: '2026-07-31',
    payDate: '2026-07-31',
    netPay: 2441.08,
    grossPay: 3360.0,
    taxes: 601.12,
    deductions: 317.8,
    chequeNumber: '#008367',
    employeeName: 'Jordan Taylor',
    paymentMethod: 'Direct deposit',
    status: 'Deposited',
    pdfUrl: SAMPLE_PDF,
  },
  {
    id: 'ps-008311',
    periodStart: '2026-07-01',
    periodEnd: '2026-07-15',
    payDate: '2026-07-15',
    netPay: 2518.76,
    grossPay: 3460.0,
    taxes: 618.9,
    deductions: 322.34,
    chequeNumber: '#008311',
    employeeName: 'Jordan Taylor',
    paymentMethod: 'Direct deposit',
    status: 'Deposited',
    pdfUrl: SAMPLE_PDF,
  },
];

export const mockW2Documents: W2Document[] = [2023, 2024, 2025, 2026].map(
  year => ({
    id: `w2-${year}`,
    year,
    fileName: `${year} W-2.pdf`,
    sizeLabel: '1.2 MB',
    pages: 2,
    pdfUrl: SAMPLE_PDF,
  }),
);
