import React, {useState} from 'react';
import {SheetLayout} from '@/components/common';
import {LogoutConfirmContent} from '@/components/profile';
import {useAppDispatch} from '@/hooks/redux';
import type {RootStackScreenProps} from '@/navigation/types';
import {logout} from '@/store/slices/authSlice';

/** On success RootNavigator swaps to the Auth stack, so no manual navigation. */
export const LogoutSheetScreen = ({navigation}: RootStackScreenProps<'LogoutSheet'>) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  return (
    <SheetLayout title="Logout confirmation" onClose={navigation.goBack}>
      <LogoutConfirmContent
        loading={loading}
        onCancel={navigation.goBack}
        onConfirm={async () => {
          setLoading(true);
          await dispatch(logout());
        }}
      />
    </SheetLayout>
  );
};
