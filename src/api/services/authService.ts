import {apiClient} from '@/api/client';
import {ENDPOINTS} from '@/api/endpoints';
import {MOCK_PIN} from '@/api/mocks/data';
import {mockDelay, mockReject} from '@/api/mocks/delay';
import {config} from '@/constants/config';
import {Company, User} from '@/types';

export type FindCompanyPayload = {
  domain: string;
  firstName: string;
  lastName: string;
};

export type LoginResult = {token: string; user: User};

export const authService = {
  async findCompany(payload: FindCompanyPayload): Promise<Company> {
    if (config.USE_MOCKS) {
      return mockDelay({
        id: 'company-1',
        name: 'Company',
        domain: payload.domain,
      });
    }
    const {data} = await apiClient.post<Company>(ENDPOINTS.findCompany, payload);
    return data;
  },

  async verifyEmployeeId(payload: {
    companyId: string;
    employeeId: string;
  }): Promise<void> {
    if (config.USE_MOCKS) {
      return mockDelay(undefined);
    }
    await apiClient.post(ENDPOINTS.verifyEmployeeId, payload);
  },

  async requestPin(): Promise<void> {
    if (config.USE_MOCKS) {
      return mockDelay(undefined);
    }
    await apiClient.post(ENDPOINTS.requestPin);
  },

  async verifyPin(pin: string): Promise<void> {
    if (config.USE_MOCKS) {
      return pin === MOCK_PIN
        ? mockDelay(undefined)
        : mockReject('That code is incorrect. Please try again.');
    }
    await apiClient.post(ENDPOINTS.verifyPin, {pin});
  },

  async login(payload: {
    employeeId: string;
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<LoginResult> {
    if (config.USE_MOCKS) {
      return mockDelay({
        token: 'mock-token',
        user: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          employeeId: payload.employeeId,
        },
      });
    }
    const {data} = await apiClient.post<LoginResult>(ENDPOINTS.login, payload);
    return data;
  },
};
