import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import {createUseStyles} from '@/theme';
import {EmployeeIdFormValues, employeeIdSchema} from '@/validation';
import {Button, FormErrorText, TextLink} from '../common';
import {FormTextField} from '../form';
import {SecurityNoticeCard} from './SecurityNoticeCard';

type Props = {
  initialValues: EmployeeIdFormValues;
  loading: boolean;
  error?: string | null;
  onSubmit: (values: EmployeeIdFormValues) => void;
  onNeedHelp: () => void;
};

const useStyles = createUseStyles(({spacing}) => ({
  form: {gap: spacing.lg},
}));

export const EmployeeIdForm = ({initialValues, loading, error, onSubmit, onNeedHelp}: Props) => {
  const styles = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={employeeIdSchema}
      onSubmit={onSubmit}>
      {({handleSubmit}) => (
        <View style={styles.form}>
          <FormTextField
            name="employeeId"
            label="Unique Employee ID"
            placeholder="e.g. 104728"
            keyboardType="number-pad"
          />
          <FormErrorText message={error} />
          <Button title="Continue" loading={loading} onPress={() => handleSubmit()} />
          <TextLink label="Need to get unique employee ID?" onPress={onNeedHelp} />
          <SecurityNoticeCard message="We never ask for your Social Security number during sign-in." />
        </View>
      )}
    </Formik>
  );
};
