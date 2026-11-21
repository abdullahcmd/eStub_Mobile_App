import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText, Button, Card} from '../common';

const STEPS = [
  'Check a recent pay statement',
  'Ask your manager or payroll team',
  'Contact support if you still need help',
];

type Props = {onContactSupport: () => void};

const useStyles = createUseStyles(({colors, radius, spacing}) => ({
  gap: {gap: spacing.lg},
  steps: {gap: spacing.md},
  step: {flexDirection: 'row', alignItems: 'center', gap: spacing.md},
  badge: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const EmployeeIdHelpContent = ({onContactSupport}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.gap}>
      <AppText color="textSecondary">
        Your unique ID is assigned by your employer and appears on your paper or
        digital pay statement.
      </AppText>
      <Card style={styles.steps}>
        {STEPS.map((s, i) => (
          <View key={s} style={styles.step}>
            <View style={styles.badge}>
              <AppText variant="caption" color="onPrimarySoft">
                {i + 1}
              </AppText>
            </View>
            <AppText variant="bodyStrong">{s}</AppText>
          </View>
        ))}
      </Card>
      <Button title="Contact payroll support" onPress={onContactSupport} />
    </View>
  );
};
