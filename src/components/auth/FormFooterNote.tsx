import React from 'react';
import {AppText} from '../common';

export const FormFooterNote = ({children}: {children: string}) => (
  <AppText variant="caption" color="textMuted" align="center">
    {children}
  </AppText>
);
