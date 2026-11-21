import React from 'react';
import {View} from 'react-native';
import {Logo} from '@/assets/icons';
import {createUseStyles} from '@/theme';
import {AppText} from '../common';

const useStyles = createUseStyles(({spacing}) => ({
  wrap: {alignItems: 'center', gap: spacing.lg},
}));

export const AppLogo = ({size = 72}: {size?: number}) => {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      <Logo width={size} height={size} />
      <AppText variant="display">eStubs</AppText>
    </View>
  );
};
