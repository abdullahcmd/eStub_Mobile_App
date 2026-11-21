import React from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {useTheme} from '@/theme';
import {navigationRef} from './navigationRef';
import {RootNavigator} from './RootNavigator';

/** NavigationContainer wired to the app theme. */
export const AppNavigation = () => {
  const {colors, isDark} = useTheme();
  const base = isDark ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        ...base,
        colors: {
          ...base.colors,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          primary: colors.primary,
        },
      }}>
      <RootNavigator />
    </NavigationContainer>
  );
};
