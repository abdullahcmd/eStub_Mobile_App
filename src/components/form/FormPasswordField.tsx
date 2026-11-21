import React from 'react';
import {useFormikContext} from 'formik';
import {PasswordField} from './PasswordField';
import {TextFieldProps} from './TextField';

type Props = Omit<TextFieldProps, 'value' | 'onChangeText' | 'error' | 'accessory' | 'secureTextEntry'> & {
  name: string;
};

export const FormPasswordField = ({name, ...rest}: Props) => {
  const {values, errors, touched, handleChange, handleBlur} =
    useFormikContext<Record<string, string>>();
  return (
    <PasswordField
      {...rest}
      value={values[name]}
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
      error={touched[name] ? errors[name] : undefined}
    />
  );
};
