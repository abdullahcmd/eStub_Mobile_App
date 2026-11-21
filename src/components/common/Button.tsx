import React from 'react';
import {ActivityIndicator, Pressable, PressableProps, ViewStyle} from 'react-native';
import {IconName} from '@/assets/icons';
import {createUseStyles, useTheme} from '@/theme';
import {AppText, AppTextColor} from './AppText';
import {Icon} from './Icon';

type Variant = 'primary' | 'outline' | 'danger' | 'text';

type Props = Omit<PressableProps, 'children' | 'style'> & {
  title: string;
  variant?: Variant;
  loading?: boolean;
  leftIcon?: IconName;
  style?: ViewStyle;
};

const useStyles = createUseStyles(({colors, radius, layout, spacing}) => ({
  base: {
    height: layout.buttonHeight,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  primary: {backgroundColor: colors.primary},
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {backgroundColor: colors.danger},
  text: {backgroundColor: 'transparent', height: layout.minTouchTarget},
  disabled: {opacity: 0.5},
  pressed: {opacity: 0.85},
}));

export const Button = ({
  title,
  variant = 'primary',
  loading,
  leftIcon,
  disabled,
  style,
  ...rest
}: Props) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const isDisabled = disabled || loading;
  const filled = variant === 'primary' || variant === 'danger';
  const textColor: AppTextColor = filled ? 'onPrimary' : 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{disabled: !!isDisabled, busy: !!loading}}
      disabled={isDisabled}
      style={({pressed}) => [
        styles.base,
        styles[variant],
        isDisabled && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={filled ? colors.onPrimary : colors.primary} />
      ) : (
        <>
          {leftIcon ? (
            <Icon
              name={leftIcon}
              size={18}
              color={filled ? 'onPrimary' : 'primary'}
            />
          ) : null}
          <AppText variant="bodyStrong" color={textColor}>
            {title}
          </AppText>
        </>
      )}
    </Pressable>
  );
};
