import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Theme, useTheme} from './ThemeProvider';

/**
 * Themed StyleSheet factory. Every component declares its styles through this
 * helper so colors/spacing always come from the theme (and react to dark mode).
 *
 *   const useStyles = createUseStyles(({colors, spacing}) => ({
 *     container: {padding: spacing.lg, backgroundColor: colors.surface},
 *   }));
 *   const styles = useStyles();
 */
export const createUseStyles =
  <T extends StyleSheet.NamedStyles<T>>(factory: (theme: Theme) => T) =>
  (): T => {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(factory(theme)), [theme]);
  };
