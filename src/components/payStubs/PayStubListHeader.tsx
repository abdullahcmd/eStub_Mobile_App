import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from '../common';

const useStyles = createUseStyles(({layout, spacing}) => ({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: layout.screenPadding,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
}));

export const PayStubListHeader = ({count}: {count: number}) => (
  <View style={useStyles().row}>
    <AppText variant="subheading">Recent statements</AppText>
    <AppText variant="caption" color="textMuted">
      {count} {count === 1 ? 'result' : 'results'}
    </AppText>
  </View>
);
