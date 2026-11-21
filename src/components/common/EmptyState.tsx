import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from './AppText';

const useStyles = createUseStyles(({spacing}) => ({
  wrap: {alignItems: 'center', padding: spacing.xxxl, gap: spacing.xs},
}));

export const EmptyState = ({title, message}: {title: string; message?: string}) => {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      <AppText variant="subheading">{title}</AppText>
      {message ? (
        <AppText color="textSecondary" align="center">
          {message}
        </AppText>
      ) : null}
    </View>
  );
};
