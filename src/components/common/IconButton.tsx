import React from 'react';
import {Pressable, PressableProps} from 'react-native';
import {IconName} from '@/assets/icons';
import {createUseStyles} from '@/theme';
import {Icon} from './Icon';

type Props = Omit<PressableProps, 'children'> & {
  icon: IconName;
  accessibilityLabel: string;
  size?: number;
};

const useStyles = createUseStyles(({colors, radius}) => ({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
  },
  pressed: {opacity: 0.7},
}));

/** Square soft-background icon button used in headers (back, info, share…). */
export const IconButton = ({icon, size = 40, style, ...rest}: Props) => {
  const styles = useStyles();
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={4}
      style={state => [
        styles.base,
        {width: size, height: size},
        state.pressed && styles.pressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}>
      <Icon name={icon} size={20} />
    </Pressable>
  );
};
