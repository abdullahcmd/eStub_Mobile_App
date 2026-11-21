import React from 'react';
import {View} from 'react-native';
import {createUseStyles} from '@/theme';

const useStyles = createUseStyles(({colors}) => ({
  line: {height: 1, backgroundColor: colors.border},
}));

export const Divider = () => <View style={useStyles().line} />;
