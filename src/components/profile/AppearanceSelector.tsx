import React from 'react';
import {View} from 'react-native';
import {ThemeMode} from '@/types';
import {createUseStyles} from '@/theme';
import {SectionLabel, SegmentedControl, SegmentOption} from '../common';

const OPTIONS: SegmentOption<ThemeMode>[] = [
  {value: 'light', label: 'Light'},
  {value: 'dark', label: 'Dark'},
  {value: 'system', label: 'System'},
];

type Props = {mode: ThemeMode; onChange: (mode: ThemeMode) => void};

const useStyles = createUseStyles(({spacing}) => ({
  wrap: {gap: spacing.sm},
}));

export const AppearanceSelector = ({mode, onChange}: Props) => (
  <View style={useStyles().wrap}>
    <SectionLabel>Appearance</SectionLabel>
    <SegmentedControl options={OPTIONS} value={mode} onChange={onChange} />
  </View>
);
