import React from 'react';
import {Pressable, View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from './AppText';

export type SegmentOption<T extends string> = {value: T; label: string};

type Props<T extends string> = {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

const useStyles = createUseStyles(({colors, radius, spacing}) => ({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.pill,
    padding: spacing.xs,
    gap: spacing.xs,
  },
  segment: {
    flex: 1,
    height: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {backgroundColor: colors.primary},
}));

/** Pill segmented control (Details | PDF, Light | Dark | System). */
export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
}: Props<T>) => {
  const styles = useStyles();
  return (
    <View style={styles.track} accessibilityRole="tablist">
      {options.map(o => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{selected}}
            onPress={() => onChange(o.value)}
            style={[styles.segment, selected && styles.selected]}>
            <AppText
              variant="label"
              color={selected ? 'onPrimary' : 'textSecondary'}>
              {o.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};
