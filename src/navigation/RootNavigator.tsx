import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ROUTES} from '@/constants/routes';
import {useAppSelector} from '@/hooks/redux';
import {
  DateFilterSheetScreen,
  EmployeeIdHelpSheetScreen,
  LogoutSheetScreen,
  PayStubDetailScreen,
  SplashScreen,
  W2ViewerScreen,
} from '@/screens';
import {selectIsAuthenticated} from '@/store/slices/authSlice';
import {selectIsBootstrapped} from '@/store/slices/appSlice';
import {AuthNavigator} from './AuthNavigator';
import {MainTabs} from './MainTabs';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const sheetOptions = {
  presentation: 'transparentModal',
  animation: 'fade',
  headerShown: false,
} as const;

/**
 * Root switch:
 *   not bootstrapped -> Splash
 *   logged out       -> Auth wizard (+ Employee ID help sheet)
 *   logged in        -> Main tabs + detail screens + sheets
 * Conditionally rendering screens means auth state changes navigate for free.
 */
export const RootNavigator = () => {
  const isBootstrapped = useAppSelector(selectIsBootstrapped);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isBootstrapped ? (
        <Stack.Screen name={ROUTES.Splash} component={SplashScreen} />
      ) : !isAuthenticated ? (
        <>
          <Stack.Screen name={ROUTES.Auth} component={AuthNavigator} />
          <Stack.Screen
            name={ROUTES.EmployeeIdHelpSheet}
            component={EmployeeIdHelpSheetScreen}
            options={sheetOptions}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={ROUTES.Main} component={MainTabs} />
          <Stack.Screen name={ROUTES.PayStubDetail} component={PayStubDetailScreen} />
          <Stack.Screen name={ROUTES.W2Viewer} component={W2ViewerScreen} />
          <Stack.Screen name={ROUTES.DateFilterSheet} component={DateFilterSheetScreen} options={sheetOptions} />
          <Stack.Screen name={ROUTES.LogoutSheet} component={LogoutSheetScreen} options={sheetOptions} />
        </>
      )}
    </Stack.Navigator>
  );
};
