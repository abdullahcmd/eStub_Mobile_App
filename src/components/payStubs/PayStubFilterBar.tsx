import React from 'react';
import {Pressable, View} from 'react-native';
import {createUseStyles} from '@/theme';
import {PayStubFilterPreset} from '@/types';
import {AppText, ChipOption, ChipRow, Icon} from '../common';

const PRESETS: ChipOption<PayStubFilterPreset>[] = [
  {value: '30d', label: '30 days'},
  {value: '3m', label: '3 months'},
  {value: 'ytd', label: 'This year'},
  {value: 'custom', label: 'Custom'},
];

type Props = {
  preset: PayStubFilterPreset;
  onPresetChange: (preset: PayStubFilterPreset) => void;
  onOpenDateFilter: () => void;
};

const useStyles = createUseStyles(({colors, radius, spacing, layout}) => ({
  wrap: {gap: spacing.md},
  row: {
    marginHorizontal: layout.screenPadding,
    height: layout.inputHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  left: {flexDirection: 'row', alignItems: 'center', gap: spacing.sm},
}));

export const PayStubFilterBar = ({preset, onPresetChange, onOpenDateFilter}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      <Pressable accessibilityRole="button" onPress={onOpenDateFilter} style={styles.row}>
        <View style={styles.left}>
          <Icon name="filter" size={18} />
          <AppText variant="bodyStrong">Filter by date range</AppText>
        </View>
        <Icon name="chevron-right" size={18} color="textSecondary" />
      </Pressable>
      <ChipRow options={PRESETS} value={preset} onChange={onPresetChange} />
    </View>
  );
};
