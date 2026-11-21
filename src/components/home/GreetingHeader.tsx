import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {formatLongDate} from '@/utils/format';
import {AppText} from '../common';

const useStyles = createUseStyles(({spacing}) => ({
  wrap: {gap: spacing.xs, marginVertical: spacing.lg},
}));

export const GreetingHeader = ({firstName}: {firstName: string}) => {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      <AppText variant="display">Hello, {firstName}</AppText>
      <AppText variant="caption" color="textSecondary">
        {formatLongDate()}
      </AppText>
    </View>
  );
};
