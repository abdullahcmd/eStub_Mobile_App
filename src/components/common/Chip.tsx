import React from 'react';
import {Pressable} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from './AppText';

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

const useStyles = createUseStyles(({colors, radius, spacing}) => ({
  chip: {
    paddingHorizontal: spacing.lg,
    height: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  selected: {backgroundColor: colors.primary},
}));

export const Chip = ({label, selected, onPress}: Props) => {
  const styles = useStyles();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{selected: !!selected}}
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}>
      <AppText variant="label" color={selected ? 'onPrimary' : 'onPrimarySoft'}>
        {label}
      </AppText>
    </Pressable>
  );
};
