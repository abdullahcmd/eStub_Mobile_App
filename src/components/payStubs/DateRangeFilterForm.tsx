import React from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';
import {Formik, FormikProps} from 'formik';
import {createUseStyles} from '@/theme';
import {PayStubFilter, PayStubFilterPreset} from '@/types';
import {resolveFilterRange} from '@/utils/dates';
import {dateRangeSchema} from '@/validation';
import {Button, ChipOption, ChipRow, TextLink} from '../common';
import {FormDateField} from '../form';

type FormValues = {
  preset: PayStubFilterPreset;
  startDate: Date | null;
  endDate: Date | null;
};

const PRESETS: ChipOption<PayStubFilterPreset>[] = [
  {value: '30d', label: '30 days'},
  {value: '3m', label: '3 months'},
  {value: 'ytd', label: 'This year'},
];

const ISO = 'YYYY-MM-DD';

type Props = {
  initialFilter: PayStubFilter;
  onApply: (filter: PayStubFilter) => void;
  onClear: () => void;
};

const useStyles = createUseStyles(({spacing}) => ({
  form: {gap: spacing.lg},
  chips: {marginHorizontal: -spacing.xl},
}));

const rangeToValues = (
  preset: PayStubFilterPreset,
  filter: PayStubFilter,
): FormValues => {
  const {from, to} = resolveFilterRange({...filter, preset});
  return {
    preset,
    startDate: from ? dayjs(from).toDate() : null,
    endDate: to ? dayjs(to).toDate() : null,
  };
};

/** Presets fill the dates; manually changed dates become a `custom` range. */
const toFilter = (values: FormValues): PayStubFilter => {
  const start = dayjs(values.startDate).format(ISO);
  const end = dayjs(values.endDate).format(ISO);
  const preset = values.preset;
  if (preset !== 'custom') {
    const range = resolveFilterRange({preset, startDate: null, endDate: null});
    if (range.from === start && range.to === end) {
      return {preset, startDate: null, endDate: null};
    }
  }
  return {preset: 'custom', startDate: start, endDate: end};
};

export const DateRangeFilterForm = ({initialFilter, onApply, onClear}: Props) => {
  const styles = useStyles();

  const pickPreset = (
    preset: PayStubFilterPreset,
    form: FormikProps<FormValues>,
  ) =>
    form.setValues(
      rangeToValues(preset, {preset, startDate: null, endDate: null}),
    );

  return (
    <Formik<FormValues>
      initialValues={rangeToValues(initialFilter.preset, initialFilter)}
      validationSchema={dateRangeSchema}
      onSubmit={values => onApply(toFilter(values))}>
      {form => (
        <View style={styles.form}>
          <View style={styles.chips}>
            <ChipRow
              options={PRESETS}
              value={form.values.preset === 'custom' ? null : form.values.preset}
              onChange={p => pickPreset(p, form)}
            />
          </View>
          <FormDateField name="startDate" label="Start date" maximumDate={new Date()} />
          <FormDateField name="endDate" label="End date" maximumDate={new Date()} />
          <Button title="Apply date range" onPress={() => form.handleSubmit()} />
          <TextLink label="Clear filter" onPress={onClear} />
        </View>
      )}
    </Formik>
  );
};
