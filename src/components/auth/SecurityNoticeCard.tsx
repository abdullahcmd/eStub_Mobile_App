import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText, Card, Icon} from '../common';

const useStyles = createUseStyles(({spacing}) => ({
  row: {flexDirection: 'row', alignItems: 'center', gap: spacing.sm},
  text: {flex: 1},
}));

export const SecurityNoticeCard = ({message}: {message: string}) => {
  const styles = useStyles();
  return (
    <Card>
      <View style={styles.row}>
        <Icon name="check" size={16} color="success" />
        <AppText variant="caption" color="textSecondary" style={styles.text}>
          {message}
        </AppText>
      </View>
    </Card>
  );
};
