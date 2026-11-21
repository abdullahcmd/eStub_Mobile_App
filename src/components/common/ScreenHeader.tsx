import React from 'react';
import {View} from 'react-native';
import {IconName} from '@/assets/icons';
import {createUseStyles} from '@/theme';
import {AppText} from './AppText';
import {IconButton} from './IconButton';

type Props = {
  title: string;
  onBack?: () => void;
  rightIcon?: IconName;
  rightLabel?: string;
  onRightPress?: () => void;
};

const useStyles = createUseStyles(({layout, spacing}) => ({
  row: {
    minHeight: layout.headerHeight,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  title: {flex: 1},
}));

/** Screen title row with optional back button and one trailing action. */
export const ScreenHeader = ({
  title,
  onBack,
  rightIcon,
  rightLabel,
  onRightPress,
}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      {onBack ? (
        <IconButton icon="chevron-left" accessibilityLabel="Go back" onPress={onBack} />
      ) : null}
      <AppText variant="heading" style={styles.title} numberOfLines={2} accessibilityRole="header">
        {title}
      </AppText>
      {rightIcon && onRightPress ? (
        <IconButton
          icon={rightIcon}
          accessibilityLabel={rightLabel ?? 'Action'}
          onPress={onRightPress}
        />
      ) : null}
    </View>
  );
};
