import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {getInitials, maskEmployeeId} from '@/utils/format';
import {AppText, Card} from '../common';

type Props = {firstName: string; lastName: string; employeeId: string};

const useStyles = createUseStyles(({colors, radius, spacing}) => ({
  row: {flexDirection: 'row', alignItems: 'center', gap: spacing.lg},
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export const ProfileCard = ({firstName, lastName, employeeId}: Props) => {
  const styles = useStyles();
  return (
    <Card>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <AppText variant="subheading" color="onPrimarySoft">
            {getInitials(firstName, lastName)}
          </AppText>
        </View>
        <View>
          <AppText variant="subheading">
            {firstName} {lastName}
          </AppText>
          <AppText variant="caption" color="textSecondary">
            Employee ID {maskEmployeeId(employeeId || '0000')}
          </AppText>
        </View>
      </View>
    </Card>
  );
};
