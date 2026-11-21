import React from 'react';
import {Pressable, View} from 'react-native';
import {IconName} from '@/assets/icons';
import {createUseStyles} from '@/theme';
import {AppText, Icon} from '../common';

type Props = {
  icon: IconName;
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

const useStyles = createUseStyles(({spacing, layout}) => ({
  row: {
    minHeight: layout.minTouchTarget + 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {flexDirection: 'row', alignItems: 'center', gap: spacing.md},
  pressed: {opacity: 0.6},
}));

export const SettingsRow = ({icon, label, onPress, destructive}: Props) => {
  const styles = useStyles();
  const color = destructive ? 'danger' : 'text';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.left}>
        <Icon name={icon} color={color} />
        <AppText variant="bodyStrong" color={color}>
          {label}
        </AppText>
      </View>
      <Icon name="chevron-right" size={16} color={destructive ? 'danger' : 'textSecondary'} />
    </Pressable>
  );
};
