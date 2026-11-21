import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from '../common';

const useStyles = createUseStyles(({colors, spacing}) => ({
  row: {flexDirection: 'row', alignItems: 'center', gap: spacing.md},
  line: {flex: 1, height: 1, backgroundColor: colors.border},
}));

export const OrDivider = () => {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <AppText variant="caption" color="textMuted">
        or
      </AppText>
      <View style={styles.line} />
    </View>
  );
};
