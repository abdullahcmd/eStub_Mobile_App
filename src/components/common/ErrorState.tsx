import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from './AppText';
import {Button} from './Button';

type Props = {message: string; onRetry?: () => void};

const useStyles = createUseStyles(({spacing}) => ({
  wrap: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xxl, gap: spacing.lg},
}));

export const ErrorState = ({message, onRetry}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      <AppText color="textSecondary" align="center">
        {message}
      </AppText>
      {onRetry ? <Button title="Try again" variant="outline" onPress={onRetry} /> : null}
    </View>
  );
};
