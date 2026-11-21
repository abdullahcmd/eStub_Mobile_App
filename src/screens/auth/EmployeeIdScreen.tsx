import React, {useEffect} from 'react';
import {AuthLayout, EmployeeIdForm} from '@/components/auth';
import {ROUTES} from '@/constants/routes';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import type {AuthStackScreenProps} from '@/navigation/types';
import {
  clearAuthError,
  selectAuth,
  submitEmployeeId,
} from '@/store/slices/authSlice';

export const EmployeeIdScreen = ({navigation}: AuthStackScreenProps<'EmployeeId'>) => {
  const dispatch = useAppDispatch();
  const {employeeId, status, error} = useAppSelector(selectAuth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return (
    <AuthLayout
      step={2}
      headerTitle="Employee verification"
      heading="Enter your Employee ID"
      subtitle="You’ll find this ID on a recent pay statement or from your payroll administrator."
      onBack={navigation.goBack}>
      <EmployeeIdForm
        initialValues={{employeeId}}
        loading={status === 'loading'}
        error={error}
        onNeedHelp={() => navigation.navigate(ROUTES.EmployeeIdHelpSheet)}
        onSubmit={async values => {
          const result = await dispatch(submitEmployeeId(values.employeeId));
          if (submitEmployeeId.fulfilled.match(result)) {
            navigation.navigate(ROUTES.VerifyPin);
          }
        }}
      />
    </AuthLayout>
  );
};
