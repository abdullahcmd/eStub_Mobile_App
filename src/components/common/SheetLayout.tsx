import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createUseStyles} from '@/theme';
import {AppText} from './AppText';
import {IconButton} from './IconButton';

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

const useStyles = createUseStyles(({colors, radius, spacing, shadows}) => ({
  root: {flex: 1, justifyContent: 'flex-end'},
  backdrop: {...StyleSheet.absoluteFillObject, backgroundColor: colors.overlay},
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    gap: spacing.lg,
    ...shadows.sheet,
  },
  handle: {alignSelf: 'flex-start', width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
}));

/**
 * Layout for bottom-sheet screens. Register the screen in the root stack with
 * `presentation: 'transparentModal'` and render this as its root.
 */
export const SheetLayout = ({title, onClose, children}: Props) => {
  const styles = useStyles();
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={styles.root}>
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
        accessibilityLabel="Dismiss"
      />
      <View style={[styles.sheet, {paddingBottom: Math.max(bottom, 16) + 8}]}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <AppText variant="heading" accessibilityRole="header">
            {title}
          </AppText>
          <IconButton icon="close" accessibilityLabel="Close" onPress={onClose} />
        </View>
        {children}
      </View>
    </View>
  );
};
