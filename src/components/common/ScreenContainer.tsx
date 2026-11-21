import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View, ViewStyle} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {createUseStyles} from '@/theme';

type Props = {
  children: React.ReactNode;
  /** Wrap content in a ScrollView (forms, long pages). */
  scroll?: boolean;
  /** Apply the default horizontal padding. */
  padded?: boolean;
  edges?: Edge[];
  contentStyle?: ViewStyle;
  /** Pinned to the bottom, outside the scroll area. */
  footer?: React.ReactNode;
};

const useStyles = createUseStyles(({colors, layout, spacing}) => ({
  safe: {flex: 1, backgroundColor: colors.background},
  flex: {flex: 1},
  padded: {paddingHorizontal: layout.screenPadding},
  scrollContent: {flexGrow: 1, paddingBottom: spacing.xxl},
  footer: {paddingHorizontal: layout.screenPadding, paddingBottom: spacing.lg},
}));

/** Base wrapper for every screen: safe area, background, keyboard + scroll. */
export const ScreenContainer = ({
  children,
  scroll,
  padded = true,
  edges = ['top', 'left', 'right'],
  contentStyle,
  footer,
}: Props) => {
  const styles = useStyles();
  const body = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContent,
        padded && styles.padded,
        contentStyle,
      ]}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, padded && styles.padded, contentStyle]}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {body}
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
