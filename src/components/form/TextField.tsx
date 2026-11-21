import React, {forwardRef, useState} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import {createUseStyles, useTheme} from '@/theme';
import {AppText, FormErrorText} from '../common';

export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
  /** Rendered inside the input on the right (icons, toggles). */
  accessory?: React.ReactNode;
};

const useStyles = createUseStyles(({colors, radius, spacing, layout, typography}) => ({
  wrap: {gap: spacing.xs},
  box: {
    height: layout.inputHeight,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  focused: {borderColor: colors.primary},
  invalid: {borderColor: colors.danger},
  input: {flex: 1, ...typography.body, color: colors.text, paddingVertical: 0},
}));

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({label, error, accessory, onFocus, onBlur, ...rest}, ref) => {
    const styles = useStyles();
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);

    return (
      <View style={styles.wrap}>
        <AppText variant="label" color="textSecondary">
          {label}
        </AppText>
        <View style={[styles.box, focused && styles.focused, !!error && styles.invalid]}>
          <TextInput
            ref={ref}
            accessibilityLabel={label}
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            onFocus={e => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={e => {
              setFocused(false);
              onBlur?.(e);
            }}
            {...rest}
          />
          {accessory}
        </View>
        <FormErrorText message={error} />
      </View>
    );
  },
);
