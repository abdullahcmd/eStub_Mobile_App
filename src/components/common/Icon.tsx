import React from 'react';
import {IconName, icons} from '@/assets/icons';
import {ThemeColors, useTheme} from '@/theme';

type Props = {
  name: IconName;
  size?: number;
  /** Theme color key; defaults to `text`. */
  color?: keyof ThemeColors;
};

export const Icon = ({name, size = 20, color = 'text'}: Props) => {
  const {colors} = useTheme();
  const SvgIcon = icons[name];
  return <SvgIcon width={size} height={size} color={colors[color]} />;
};
