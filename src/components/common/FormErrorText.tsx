import React from 'react';
import {AppText} from './AppText';

/** Inline error under a field / form (server errors or Yup messages). */
export const FormErrorText = ({message}: {message?: string | null}) =>
  message ? (
    <AppText variant="caption" color="danger" accessibilityRole="alert">
      {message}
    </AppText>
  ) : null;
