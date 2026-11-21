import React from 'react';
import {Pressable, View} from 'react-native';
import {createUseStyles} from '@/theme';
import {PayStub} from '@/types';
import {formatCurrency, formatPeriod} from '@/utils/format';
import {AppText, Icon} from '../common';

type Props = {payStub: PayStub; onPress: (id: string) => void};

const useStyles = createUseStyles(({colors, radius, spacing, shadows}) => ({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.xs,
    ...shadows.card,
  },
  top: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  bottom: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  pressed: {opacity: 0.85},
}));

export const PayStubListItem = ({payStub, onPress}: Props) => {
  const styles = useStyles();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(payStub.id)}
      style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.top}>
        <AppText variant="subheading">
          {formatPeriod(payStub.periodStart, payStub.periodEnd)}
        </AppText>
        <AppText variant="subheading">{formatCurrency(payStub.netPay)}</AppText>
      </View>
      <View style={styles.bottom}>
        <AppText variant="caption" color="textSecondary">
          Cheque {payStub.chequeNumber}  •  {payStub.employeeName}
        </AppText>
        <Icon name="chevron-right" size={16} color="textSecondary" />
      </View>
    </Pressable>
  );
};
