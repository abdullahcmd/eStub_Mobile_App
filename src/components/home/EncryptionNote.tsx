import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';
import {AppText} from '../common';

const useStyles = createUseStyles(({spacing}) => ({
  wrap: {marginTop: spacing.xl},
}));

export const EncryptionNote = () => (
  <View style={useStyles().wrap}>
    <AppText variant="caption" color="textMuted" align="center">
      Documents are encrypted in transit and at rest.
    </AppText>
  </View>
);
