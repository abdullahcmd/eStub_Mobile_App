import React from 'react';
import {config} from '@/constants/config';
import {AppText} from '../common';

export const AppVersionFooter = () => (
  <AppText variant="caption" color="textMuted" align="center">
    eStubs {config.APP_VERSION}  •  Build {config.APP_BUILD}
  </AppText>
);
