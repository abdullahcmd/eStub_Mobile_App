import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from '../common';

const useStyles = createUseStyles(({colors, radius, spacing}) => ({
  page: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.lg,
    gap: spacing.sm,
    width: '100%',
    aspectRatio: 0.78,
  },
  rule: {height: 6, borderRadius: 3, backgroundColor: colors.skeleton},
  row: {flexDirection: 'row', gap: spacing.sm},
  cell: {flex: 1, height: 14, borderRadius: 3, backgroundColor: colors.surfaceMuted},
}));

/** Skeleton page used as the thumbnail until a real PDF preview exists. */
export const DocumentPlaceholder = ({title}: {title: string}) => {
  const styles = useStyles();
  return (
    <View style={styles.page}>
      <AppText variant="heading" color="primary">
        {title}
      </AppText>
      <View style={styles.rule} />
      {Array.from({length: 5}).map((_, i) => (
        <View key={i} style={styles.row}>
          <View style={styles.cell} />
          <View style={styles.cell} />
        </View>
      ))}
    </View>
  );
};
