import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText, Button, Icon, TextLink} from '../common';

type Props = {loading: boolean; onConfirm: () => void; onCancel: () => void};

const useStyles = createUseStyles(({colors, radius, spacing}) => ({
  wrap: {gap: spacing.lg},
  icon: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {gap: spacing.sm},
}));

export const LogoutConfirmContent = ({loading, onConfirm, onCancel}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      <View style={styles.icon}>
        <Icon name="logout" color="danger" />
      </View>
      <View style={styles.text}>
        <AppText variant="heading" align="center">
          Log out of eStubs?
        </AppText>
        <AppText color="textSecondary" align="center">
          You’ll need to verify your identity again to access payroll documents.
        </AppText>
      </View>
      <Button title="Log out" variant="danger" loading={loading} onPress={onConfirm} />
      <TextLink label="Cancel" onPress={onCancel} disabled={loading} />
    </View>
  );
};
