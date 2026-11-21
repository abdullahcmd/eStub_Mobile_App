import React, {createContext, useContext, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {useAppSelector} from '@/hooks/redux';
import {selectThemeMode} from '@/store/slices/themeSlice';
import {darkColors, lightColors, ThemeColors} from './colors';
import {layout, radius, shadows, spacing, typography} from './tokens';

export type Theme = {
  isDark: boolean;
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  shadows: typeof shadows;
  layout: typeof layout;
};

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const mode = useAppSelector(selectThemeMode);
  const systemScheme = useColorScheme();

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';

  const theme = useMemo<Theme>(
    () => ({
      isDark,
      colors: isDark ? darkColors : lightColors,
      spacing,
      radius,
      typography,
      shadows,
      layout,
    }),
    [isDark],
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return theme;
};
