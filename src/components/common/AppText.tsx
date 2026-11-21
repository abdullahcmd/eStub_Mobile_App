import React from 'react';
import {Text, TextProps} from 'react-native';
import {TextVariant, ThemeColors, useTheme} from '@/theme';

export type AppTextColor = keyof Pick<
  ThemeColors,
  | 'text'
  | 'textSecondary'
  | 'textMuted'
  | 'primary'
  | 'onPrimary'
  | 'danger'
  | 'success'
  | 'onPrimarySoft'
>;

type Props = TextProps & {
  variant?: TextVariant;
  color?: AppTextColor;
  align?: 'left' | 'center' | 'right';
};

/** The only Text component screens/components should use. */
export const AppText = ({
  variant = 'body',
  color = 'text',
  align,
  style,
  ...rest
}: Props) => {
  const {typography, colors} = useTheme();
  return (
    <Text
      {...rest}
      style={[
        typography[variant],
        {color: colors[color]},
        align ? {textAlign: align} : null,
        style,
      ]}
    />
  );
};
