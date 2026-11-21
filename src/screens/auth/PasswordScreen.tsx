import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {AuthLayout, PasswordForm} from '@/components/auth';
import {config} from '@/constants/config';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import type {AuthStackScreenProps} from '@/navigation/types';
import {
  clearAuthError,
  loginWithBiometrics,
  selectAuth,
  submitPassword,
} from '@/store/slices/authSlice';
import {biometrics} from '@/utils/biometrics';

/** Final step. On success the token is set and RootNavigator swaps to <Main/>. */
export const PasswordScreen = ({navigation}: AuthStackScreenProps<'Password'>) => {
  const dispatch = useAppDispatch();
  const {status, error, biometricEnabled} = useAppSelector(selectAuth);
  const [sensorAvailable, setSensorAvailable] = useState(false);

  useEffect(() => {
    dispatch(clearAuthError());
    biometrics.isAvailable().then(setSensorAvailable).catch(() => undefined);
  }, [dispatch]);

  return (
    <AuthLayout
      step={4}
      headerTitle="Secure sign in"
      heading="Enter your password"
      subtitle="One last step. Your password protects access to payroll and tax documents."
      onBack={navigation.goBack}>
      <PasswordForm
        loading={status === 'loading'}
        error={error}
        biometricAvailable={sensorAvailable && biometricEnabled}
        onSubmit={({password}) => dispatch(submitPassword(password))}
        onBiometricLogin={() => dispatch(loginWithBiometrics())}
        // TODO: replace with the real reset-password flow/URL.
        onForgotPassword={() => Linking.openURL(`mailto:${config.SUPPORT_EMAIL}`)}
      />
    </AuthLayout>
  );
};
