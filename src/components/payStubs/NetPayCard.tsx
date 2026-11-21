import React from 'react';
import {createUseStyles} from '@/theme';
import {PayStub} from '@/types';
import {formatCurrency, formatFullDate} from '@/utils/format';
import {AppText, Card, SectionLabel} from '../common';

const useStyles = createUseStyles(({spacing}) => ({
  card: {gap: spacing.xs},
}));

export const NetPayCard = ({payStub}: {payStub: PayStub}) => (
  <Card style={useStyles().card}>
    <SectionLabel>Net pay</SectionLabel>
    <AppText variant="amount">{formatCurrency(payStub.netPay)}</AppText>
    <AppText variant="caption" color="textSecondary">
      {payStub.paymentMethod}  •  {formatFullDate(payStub.payDate)}
    </AppText>
  </Card>
);
