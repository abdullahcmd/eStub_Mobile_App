import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {createUseStyles} from '@/theme';
import {PasswordFormValues, passwordSchema} from '@/validation';
import {Button, FormErrorText, TextLink} from '../common';
import {FormPasswordField} from '../form';
import {OrDivider} from './OrDivider';

type Props = {
  loading: boolean;
  error?: string | null;
  biometricAvailable: boolean;
  onSubmit: (values: PasswordFormValues) => void;
  onForgotPassword: () => void;
  onBiometricLogin: () => void;
};

const useStyles = createUseStyles(({spacing}) => ({
  form: {gap: spacing.lg},
}));

export const PasswordForm = ({
  loading,
  error,
  biometricAvailable,
  onSubmit,
  onForgotPassword,
  onBiometricLogin,
}: Props) => {
  const styles = useStyles();
  return (
    <Formik
      initialValues={{password: ''}}
      validationSchema={passwordSchema}
      onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <View style={styles.form}>
          <FormPasswordField name="password" label="Password" placeholder="Enter your password" />
          <TextLink label="Forgot password?" onPress={onForgotPassword} />
          <FormErrorText message={error} />
          <Button title="Log In" loading={loading} onPress={() => handleSubmit()} />
          {biometricAvailable ? (
            <>
              <OrDivider />
              <Button
                title="Log in with Face ID"
                variant="outline"
                leftIcon="face-id"
                onPress={onBiometricLogin}
                disabled={loading}
              />
            </>
          ) : null}
        </View>
      )}
    </Formik>
  );
};
