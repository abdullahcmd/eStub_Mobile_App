import React from 'react';
import {useFormikContext} from 'formik';
import {TextField, TextFieldProps} from './TextField';

type Props = Omit<TextFieldProps, 'value' | 'onChangeText' | 'error'> & {name: string};

/** Formik-bound TextField. Must be rendered inside <Formik>. */
export const FormTextField = ({name, ...rest}: Props) => {
  const {values, errors, touched, handleChange, handleBlur} =
    useFormikContext<Record<string, string>>();
  return (
    <TextField
      {...rest}
      value={values[name]}
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      error={touched[name] ? errors[name] : undefined}
    />
  );
};
