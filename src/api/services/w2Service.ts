import {apiClient} from '@/api/client';
import {ENDPOINTS} from '@/api/endpoints';
import {mockW2Documents} from '@/api/mocks/data';
import {mockDelay} from '@/api/mocks/delay';
import {config} from '@/constants/config';
import {W2Document} from '@/types';

export const w2Service = {
  async list(): Promise<W2Document[]> {
    if (config.USE_MOCKS) {
      return mockDelay(mockW2Documents);
    }
    const {data} = await apiClient.get<W2Document[]>(ENDPOINTS.w2Forms);
    return data;
  },
};
