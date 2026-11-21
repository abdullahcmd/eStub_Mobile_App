import dayjs from 'dayjs';

export const formatCurrency = (value: number, signed = false): string => {
  const abs = Math.abs(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  if (!signed) {
    return value < 0 ? `-${abs}` : abs;
  }
  return value < 0 ? `-${abs}` : `${abs}`;
};

/** "Aug 1–15, 2026" */
export const formatPeriod = (startIso: string, endIso: string): string => {
  const s = dayjs(startIso);
  const e = dayjs(endIso);
  if (s.isSame(e, 'month')) {
    return `${s.format('MMM D')}–${e.format('D, YYYY')}`;
  }
  return `${s.format('MMM D')} – ${e.format('MMM D, YYYY')}`;
};

/** "Thursday, August 13" */
export const formatLongDate = (date: Date | string = new Date()): string =>
  dayjs(date).format('dddd, MMMM D');

/** "August 15, 2026" */
export const formatFullDate = (date: Date | string): string =>
  dayjs(date).format('MMMM D, YYYY');

export const formatCountdown = (totalSeconds: number): string => {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const maskEmployeeId = (id: string): string =>
  `••••${id.slice(-4)}`;

export const getInitials = (first: string, last: string): string =>
  `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
