import dayjs from 'dayjs';
import {PayStubFilter} from '@/types';

/** Resolves a filter preset to an inclusive ISO date range (null = no bound). */
export const resolveFilterRange = (
  filter: PayStubFilter,
): {from: string | null; to: string | null} => {
  const today = dayjs();
  switch (filter.preset) {
    case '30d':
      return {
        from: today.subtract(30, 'day').format('YYYY-MM-DD'),
        to: today.format('YYYY-MM-DD'),
      };
    case '3m':
      return {
        from: today.subtract(3, 'month').format('YYYY-MM-DD'),
        to: today.format('YYYY-MM-DD'),
      };
    case 'ytd':
      return {
        from: today.startOf('year').format('YYYY-MM-DD'),
        to: today.format('YYYY-MM-DD'),
      };
    case 'custom':
      return {from: filter.startDate, to: filter.endDate};
  }
};
