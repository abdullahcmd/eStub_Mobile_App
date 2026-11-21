import React, {useEffect} from 'react';
import {AuthLayout, PinForm} from '@/components/auth';
import {ROUTES} from '@/constants/routes';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import type {AuthStackScreenProps} from '@/navigation/types';
import {
  clearAuthError,
  resendPin,
  selectAuth,
  submitPin,
} from '@/store/slices/authSlice';

export const VerifyPinScreen = ({navigation}: AuthStackScreenProps<'VerifyPin'>) => {
  const dispatch = useAppDispatch();
  const {pinExpiresAt, status, error} = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return (
    <AuthLayout
      step={3}
      headerTitle="Verify identity"
      heading="Enter your PIN"
      subtitle="We sent a six-digit code to the verified contact method on file."
      onBack={navigation.goBack}>
      <PinForm
        expiresAt={pinExpiresAt}
        loading={status === 'loading'}
        error={error}
        onResend={() => dispatch(resendPin())}
        onSubmit={async ({pin}) => {
          const result = await dispatch(submitPin(pin));
          if (submitPin.fulfilled.match(result)) {
            navigation.navigate(ROUTES.Password);
          }
        }}
      />
    </AuthLayout>
  );
};
