import * as Keychain from 'react-native-keychain';

const SERVICE = 'com.estubs.auth';

/** Auth tokens live in the OS keychain/keystore — never in redux-persist. */
export const secureStorage = {
  async saveToken(token: string): Promise<void> {
    await Keychain.setGenericPassword('session', token, {service: SERVICE});
  },
  async getToken(): Promise<string | null> {
    const creds = await Keychain.getGenericPassword({service: SERVICE});
    return creds ? creds.password : null;
  },
  async clearToken(): Promise<void> {
    await Keychain.resetGenericPassword({service: SERVICE});
  },
};
