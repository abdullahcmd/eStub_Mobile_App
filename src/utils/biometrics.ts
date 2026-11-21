import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

export const biometrics = {
  async isAvailable(): Promise<boolean> {
    const {available} = await rnBiometrics.isSensorAvailable();
    return available;
  },
  /** Resolves true when the user passes the Face ID / fingerprint prompt. */
  async authenticate(promptMessage = 'Log in to eStubs'): Promise<boolean> {
    const {success} = await rnBiometrics.simplePrompt({promptMessage});
    return success;
  },
};
