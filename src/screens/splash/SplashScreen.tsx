import React from 'react';
import {View} from 'react-native';
import {AppLogo} from '@/components/auth';
import {AppText} from '@/components/common';
import {createUseStyles} from '@/theme';
import {SplashDots} from './SplashDots';

const useStyles = createUseStyles(({colors, spacing}) => ({
  root: {flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', gap: spacing.xxl},
}));

export const SplashScreen = () => {
  const styles = useStyles();
  return (
    <View style={styles.root}>
      <AppLogo />
      <AppText color="textSecondary">Payroll documents, securely in hand.</AppText>
      <SplashDots />
    </View>
  );
};
