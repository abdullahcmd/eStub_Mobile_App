import React from 'react';
import {View, ViewProps} from 'react-native';
import {createUseStyles} from '@/theme';

const useStyles = createUseStyles(({colors, radius, spacing, shadows}) => ({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
}));

export const Card = ({style, ...rest}: ViewProps) => {
  const styles = useStyles();
  return <View style={[styles.card, style]} {...rest} />;
};
