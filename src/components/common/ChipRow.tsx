import React from 'react';
import {ScrollView} from 'react-native';
import {createUseStyles} from '@/theme';
import {Chip} from './Chip';

export type ChipOption<T extends string | number> = {value: T; label: string};

type Props<T extends string | number> = {
  options: ChipOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
};

const useStyles = createUseStyles(({spacing}) => ({
  content: {gap: spacing.sm, paddingHorizontal: spacing.xl},
}));

/** Horizontally scrollable single-select chip list (year picker, filters). */
export const ChipRow = <T extends string | number>({
  options,
  value,
  onChange,
}: Props<T>) => {
  const styles = useStyles();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {options.map(o => (
        <Chip
          key={o.value}
          label={o.label}
          selected={o.value === value}
          onPress={() => onChange(o.value)}
        />
      ))}
    </ScrollView>
  );
};
