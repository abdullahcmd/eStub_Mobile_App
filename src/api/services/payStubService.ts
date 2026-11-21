import {apiClient} from '@/api/client';
import {ENDPOINTS} from '@/api/endpoints';
import {mockPayStubs} from '@/api/mocks/data';
import {mockDelay} from '@/api/mocks/delay';
import {config} from '@/constants/config';
import {PayStub} from '@/types';

export type PayStubQuery = {
  page: number;
  pageSize: number;
  from: string | null;
  to: string | null;
};

export type PayStubPage = {items: PayStub[]; hasMore: boolean};

export const payStubService = {
  async list(query: PayStubQuery): Promise<PayStubPage> {
    if (config.USE_MOCKS) {
      // Mocks ignore the date window so the UI always has data to show.
      const start = (query.page - 1) * query.pageSize;
      const items = mockPayStubs.slice(start, start + query.pageSize);
      return mockDelay({items, hasMore: false});
    }
    const {data} = await apiClient.get<PayStubPage>(ENDPOINTS.payStubs, {
      params: query,
    });
    return data;
  },

  async get(id: string): Promise<PayStub> {
    if (config.USE_MOCKS) {
      const found = mockPayStubs.find(p => p.id === id);
      return mockDelay(found ?? mockPayStubs[0]);
    }
    const {data} = await apiClient.get<PayStub>(ENDPOINTS.payStub(id));
    return data;
  },
};
