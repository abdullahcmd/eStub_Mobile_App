import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from './AppText';

const useStyles = createUseStyles(({colors, radius, spacing}) => ({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
}));

export const StatusBadge = ({label}: {label: string}) => (
  <View style={useStyles().badge}>
    <AppText variant="caption" color="textSecondary">
      {label}
    </AppText>
  </View>
);
