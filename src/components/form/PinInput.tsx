import React, {useRef} from 'react';
import {Pressable, TextInput, View} from 'react-native';
import {config} from '@/constants/config';
import {createUseStyles} from '@/theme';
import {AppText, FormErrorText} from '../common';

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  length?: number;
  autoFocus?: boolean;
};

const useStyles = createUseStyles(({colors, radius, spacing}) => ({
  row: {flexDirection: 'row', justifyContent: 'space-between'},
  box: {
    width: 48,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  active: {borderColor: colors.primary, borderWidth: 2},
  invalid: {borderColor: colors.danger},
  hidden: {position: 'absolute', opacity: 0, width: 1, height: 1},
  wrap: {gap: spacing.sm},
}));

/** N-box one-time-code input backed by a single hidden TextInput. */
export const PinInput = ({
  value,
  onChange,
  error,
  length = config.PIN_LENGTH,
  autoFocus = true,
}: Props) => {
  const styles = useStyles();
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={styles.wrap}>
      <Pressable onPress={() => inputRef.current?.focus()} accessibilityLabel="Verification code">
        <View style={styles.row}>
          {Array.from({length}).map((_, i) => (
            <View
              key={i}
              style={[
                styles.box,
                i === value.length && styles.active,
                !!error && styles.invalid,
              ]}>
              <AppText variant="heading">{value[i] ? '•' : ''}</AppText>
            </View>
          ))}
        </View>
      </Pressable>
      <TextInput
        ref={inputRef}
        value={value}
        autoFocus={autoFocus}
        onChangeText={t => onChange(t.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        maxLength={length}
        style={styles.hidden}
      />
      <FormErrorText message={error} />
    </View>
  );
};
