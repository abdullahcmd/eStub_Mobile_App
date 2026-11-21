import React from 'react';
import {useFormikContext} from 'formik';
import {DateField} from './DateField';

type Props = {name: string; label: string; maximumDate?: Date};

export const FormDateField = ({name, label, maximumDate}: Props) => {
  const {values, errors, touched, setFieldValue, setFieldTouched} =
    useFormikContext<Record<string, Date | null>>();
  return (
    <DateField
      label={label}
      value={values[name]}
      maximumDate={maximumDate}
      onChange={d => {
        setFieldValue(name, d);
        setFieldTouched(name, true, false);
      }}
      error={touched[name] ? (errors[name] as string | undefined) : undefined}
    />
  );
};
