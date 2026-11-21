import React from 'react';
import {ActivityIndicator, Pressable, View} from 'react-native';
import {createUseStyles, useTheme} from '@/theme';
import {PayStub} from '@/types';
import {formatCurrency, formatPeriod} from '@/utils/format';
import {AppText, Card, SectionLabel, StatusBadge} from '../common';

type Props = {
  payStub?: PayStub;
  loading: boolean;
  onViewPress: () => void;
};

const useStyles = createUseStyles(({spacing}) => ({
  card: {gap: spacing.sm},
  top: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
}));

export const LatestPayStubCard = ({payStub, loading, onViewPress}: Props) => {
  const styles = useStyles();
  const {colors} = useTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <SectionLabel>Most recent pay stub</SectionLabel>
        {payStub ? (
          <Pressable accessibilityRole="button" onPress={onViewPress} hitSlop={8}>
            <AppText variant="label" color="primary">
              View ›
            </AppText>
          </Pressable>
        ) : null}
      </View>
      {loading && !payStub ? (
        <ActivityIndicator color={colors.primary} />
      ) : payStub ? (
        <>
          <AppText variant="amount">{formatCurrency(payStub.netPay)}</AppText>
          <AppText variant="caption" color="textSecondary">
            Net pay  •  {formatPeriod(payStub.periodStart, payStub.periodEnd)}
          </AppText>
          <StatusBadge label={payStub.status} />
        </>
      ) : (
        <AppText color="textSecondary">No pay stubs yet.</AppText>
      )}
    </Card>
  );
};
