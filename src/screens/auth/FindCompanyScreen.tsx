import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {AuthLayout, CompanyForm} from '@/components/auth';
import {config} from '@/constants/config';
import {ROUTES} from '@/constants/routes';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import type {AuthStackScreenProps} from '@/navigation/types';
import {
  clearAuthError,
  selectAuth,
  submitCompany,
} from '@/store/slices/authSlice';

export const FindCompanyScreen = ({navigation}: AuthStackScreenProps<'FindCompany'>) => {
  const dispatch = useAppDispatch();
  const {company, firstName, lastName, status, error} = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return (
    <AuthLayout
      step={1}
      headerTitle="Find your company"
      heading="Welcome — let’s find your company"
      subtitle="We use these details to securely locate your employer’s payroll portal."
      rightIcon="info"
      rightLabel="Contact support"
      onRightPress={() => Linking.openURL(`mailto:${config.SUPPORT_EMAIL}`)}>
      <CompanyForm
        initialValues={{domain: company?.domain ?? '', firstName, lastName}}
        loading={status === 'loading'}
        error={error}
        onSubmit={async values => {
          const result = await dispatch(submitCompany(values));
          if (submitCompany.fulfilled.match(result)) {
            navigation.navigate(ROUTES.EmployeeId);
          }
        }}
      />
    </AuthLayout>
  );
};
