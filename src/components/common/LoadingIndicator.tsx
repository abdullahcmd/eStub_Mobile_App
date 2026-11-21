import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createUseStyles, useTheme} from '@/theme';

const useStyles = createUseStyles(({spacing}) => ({
  wrap: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxl},
}));

export const LoadingIndicator = () => {
  const styles = useStyles();
  const {colors} = useTheme();
  return (
    <View style={styles.wrap}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};
