import React, {useState} from 'react';
import {Platform, Pressable, View} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {createUseStyles} from '@/theme';
import {formatFullDate} from '@/utils/format';
import {AppText, FormErrorText, Icon} from '../common';

type Props = {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  maximumDate?: Date;
};

const useStyles = createUseStyles(({colors, radius, spacing, layout}) => ({
  wrap: {gap: spacing.xs},
  box: {
    height: layout.inputHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  invalid: {borderColor: colors.danger},
}));

export const DateField = ({label, value, onChange, error, maximumDate}: Props) => {
  const styles = useStyles();
  const [showIos, setShowIos] = useState(false);

  const handleChange = (_: DateTimePickerEvent, date?: Date) => {
    if (date) {
      onChange(date);
    }
  };

  const open = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value: value ?? new Date(),
        maximumDate,
        onChange: handleChange,
      });
    } else {
      setShowIos(s => !s);
    }
  };

  return (
    <View style={styles.wrap}>
      <AppText variant="label" color="textSecondary">
        {label}
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={open}
        style={[styles.box, !!error && styles.invalid]}>
        <AppText color={value ? 'text' : 'textMuted'}>
          {value ? formatFullDate(value) : 'Select date'}
        </AppText>
        <Icon name="calendar" color="textSecondary" />
      </Pressable>
      {Platform.OS === 'ios' && showIos ? (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="inline"
          maximumDate={maximumDate}
          onChange={handleChange}
        />
      ) : null}
      <FormErrorText message={error} />
    </View>
  );
};
