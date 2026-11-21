import React from 'react';
import {Pressable} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from './AppText';

type Props = {label: string; onPress: () => void; disabled?: boolean};

const useStyles = createUseStyles(({layout}) => ({
  wrap: {minHeight: layout.minTouchTarget, alignItems: 'center', justifyContent: 'center'},
}));

/** Centered text-only action ("Forgot password?", "Resend"). */
export const TextLink = ({label, onPress, disabled}: Props) => {
  const styles = useStyles();
  return (
    <Pressable
      accessibilityRole="link"
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrap, disabled && {opacity: 0.5}]}>
      <AppText variant="bodyStrong" color="primary">
        {label}
      </AppText>
    </Pressable>
  );
};
