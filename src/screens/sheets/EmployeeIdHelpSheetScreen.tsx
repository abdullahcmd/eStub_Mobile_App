import React from 'react';
import {Linking} from 'react-native';
import {SheetLayout} from '@/components/common';
import {EmployeeIdHelpContent} from '@/components/auth';
import {config} from '@/constants/config';
import type {RootStackScreenProps} from '@/navigation/types';

export const EmployeeIdHelpSheetScreen = ({
  navigation,
}: RootStackScreenProps<'EmployeeIdHelpSheet'>) => (
  <SheetLayout title="Employee ID Help" onClose={navigation.goBack}>
    <EmployeeIdHelpContent
      onContactSupport={() => Linking.openURL(`mailto:${config.SUPPORT_EMAIL}`)}
    />
  </SheetLayout>
);
