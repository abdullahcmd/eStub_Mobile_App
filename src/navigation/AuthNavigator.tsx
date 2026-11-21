import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '@/constants/routes';
import {
  EmployeeIdScreen,
  FindCompanyScreen,
  PasswordScreen,
  VerifyPinScreen,
} from '@/screens';
import type {AuthStackParamList} from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={ROUTES.FindCompany}
    screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
    <Stack.Screen name={ROUTES.FindCompany} component={FindCompanyScreen} />
    <Stack.Screen name={ROUTES.EmployeeId} component={EmployeeIdScreen} />
    <Stack.Screen name={ROUTES.VerifyPin} component={VerifyPinScreen} />
    <Stack.Screen name={ROUTES.Password} component={PasswordScreen} />
  </Stack.Navigator>
);
