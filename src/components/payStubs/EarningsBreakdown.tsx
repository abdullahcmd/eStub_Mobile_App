import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {PayStub} from '@/types';
import {formatCurrency} from '@/utils/format';
import {AppText, Card, Divider} from '../common';

const useStyles = createUseStyles(({spacing}) => ({
  card: {gap: spacing.md},
  row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
}));

type Row = {label: string; value: string; emphasised?: boolean};

export const EarningsBreakdown = ({payStub}: {payStub: PayStub}) => {
  const styles = useStyles();
  const rows: Row[] = [
    {label: 'Gross pay', value: formatCurrency(payStub.grossPay)},
    {label: 'Federal & state taxes', value: `-${formatCurrency(payStub.taxes)}`},
    {label: 'Benefits & deductions', value: `-${formatCurrency(payStub.deductions)}`},
    {label: 'Net pay', value: formatCurrency(payStub.netPay), emphasised: true},
    {label: 'Cheque number', value: payStub.chequeNumber},
  ];

  return (
    <Card style={styles.card}>
      <AppText variant="subheading">Earnings & deductions</AppText>
      {rows.map(r => (
        <React.Fragment key={r.label}>
          <Divider />
          <View style={styles.row}>
            <AppText
              variant={r.emphasised ? 'bodyStrong' : 'body'}
              color={r.emphasised ? 'text' : 'textSecondary'}>
              {r.label}
            </AppText>
            <AppText variant="bodyStrong">{r.value}</AppText>
          </View>
        </React.Fragment>
      ))}
    </Card>
  );
};
