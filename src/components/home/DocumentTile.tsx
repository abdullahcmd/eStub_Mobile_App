import React from 'react';
import {Pressable, View} from 'react-native';
import {IconName} from '@/assets/icons';
import {createUseStyles} from '@/theme';
import {AppText, Icon} from '../common';

type Props = {
  icon: IconName;
  title: string;
  description: string;
  onPress: () => void;
};

const useStyles = createUseStyles(({colors, radius, spacing, shadows}) => ({
  tile: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadows.card,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  pressed: {opacity: 0.85},
}));

export const DocumentTile = ({icon, title, description, onPress}: Props) => {
  const styles = useStyles();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({pressed}) => [styles.tile, pressed && styles.pressed]}>
      <View style={styles.iconWrap}>
        <Icon name={icon} color="onPrimarySoft" />
      </View>
      <AppText variant="subheading">{title}</AppText>
      <AppText variant="caption" color="textSecondary">
        {description}
      </AppText>
    </Pressable>
  );
};
