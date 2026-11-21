import React from 'react';
import {useFormikContext} from 'formik';
import {PinInput} from './PinInput';

export const FormPinInput = ({name}: {name: string}) => {
  const {values, errors, touched, setFieldValue} =
    useFormikContext<Record<string, string>>();
  return (
    <PinInput
      value={values[name]}
      onChange={v => setFieldValue(name, v)}
      error={touched[name] ? errors[name] : undefined}
    />
  );
};
