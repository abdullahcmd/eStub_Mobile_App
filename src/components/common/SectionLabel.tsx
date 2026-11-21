import React from 'react';
import {AppText} from './AppText';

/** Small uppercase section caption ("APPEARANCE", "NET PAY"). */
export const SectionLabel = ({children}: {children: string}) => (
  <AppText variant="overline" color="textMuted">
    {children}
  </AppText>
);
