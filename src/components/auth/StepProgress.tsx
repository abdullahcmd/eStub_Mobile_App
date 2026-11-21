import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';

type Props = {step: number; total?: number};

const useStyles = createUseStyles(({colors, spacing}) => ({
  row: {flexDirection: 'row', gap: spacing.sm},
  bar: {flex: 1, height: 3, borderRadius: 2, backgroundColor: colors.border},
  done: {backgroundColor: colors.primary},
}));

/** Segmented progress bar for the 4-step sign-in wizard. */
export const StepProgress = ({step, total = 4}: Props) => {
  const styles = useStyles();
  return (
    <View
      style={styles.row}
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${step} of ${total}`}>
      {Array.from({length: total}).map((_, i) => (
        <View key={i} style={[styles.bar, i < step && styles.done]} />
      ))}
    </View>
  );
};
