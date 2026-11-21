import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText, IconButton} from '../common';

type Props = {onToggleTheme: () => void};

const useStyles = createUseStyles(({layout}) => ({
  row: {
    minHeight: layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export const HomeHeader = ({onToggleTheme}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      <AppText variant="heading">eStubs</AppText>
      <IconButton icon="theme" accessibilityLabel="Toggle appearance" onPress={onToggleTheme} />
    </View>
  );
};
