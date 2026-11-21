import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {useCountdown} from '@/hooks/useCountdown';
import {createUseStyles} from '@/theme';
import {formatCountdown} from '@/utils/format';
import {PinFormValues, pinSchema} from '@/validation';
import {AppText, Button, FormErrorText, TextLink} from '../common';
import {FormPinInput} from '../form';

type Props = {
  expiresAt: number | null;
  loading: boolean;
  error?: string | null;
  onSubmit: (values: PinFormValues) => void;
  onResend: () => void;
};

const useStyles = createUseStyles(({spacing}) => ({
  form: {gap: spacing.lg},
}));

export const PinForm = ({expiresAt, loading, error, onSubmit, onResend}: Props) => {
  const styles = useStyles();
  const secondsLeft = useCountdown(expiresAt);
  const expired = secondsLeft === 0;

  return (
    <Formik
      initialValues={{pin: ''}}
      validationSchema={pinSchema}
      onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <View style={styles.form}>
          <FormPinInput name="pin" />
          <AppText variant="caption" color="textMuted" align="center">
            {expired ? 'Code expired' : `Code expires in ${formatCountdown(secondsLeft)}`}
          </AppText>
          <FormErrorText message={error} />
          <Button title="Verify" loading={loading} disabled={expired} onPress={() => handleSubmit()} />
          <TextLink label="Didn’t receive a PIN? Resend" onPress={onResend} disabled={loading} />
        </View>
      )}
    </Formik>
  );
};
