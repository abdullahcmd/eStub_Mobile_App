import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {createUseStyles} from '@/theme';
import {CompanyFormValues, companySchema} from '@/validation';
import {Button, FormErrorText} from '../common';
import {FormTextField} from '../form';
import {FormFooterNote} from './FormFooterNote';

type Props = {
  initialValues: CompanyFormValues;
  loading: boolean;
  error?: string | null;
  onSubmit: (values: CompanyFormValues) => void;
};

const useStyles = createUseStyles(({spacing}) => ({
  form: {gap: spacing.lg},
}));

export const CompanyForm = ({initialValues, loading, error, onSubmit}: Props) => {
  const styles = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={companySchema}
      onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <View style={styles.form}>
          <FormTextField
            name="domain"
            label="Domain name"
            placeholder="company.estubs.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
          <FormTextField name="firstName" label="First name" placeholder="Jordan" textContentType="givenName" />
          <FormTextField name="lastName" label="Last name" placeholder="Taylor" textContentType="familyName" />
          <FormErrorText message={error} />
          <Button title="Continue" loading={loading} onPress={() => handleSubmit()} />
          <FormFooterNote>
            Your information is encrypted and only used for verification.
          </FormFooterNote>
        </View>
      )}
    </Formik>
  );
};
