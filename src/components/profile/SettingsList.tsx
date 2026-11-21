import React from 'react';
import {View} from 'react-native';
import {IconName} from '@/assets/icons';
import {createUseStyles} from '@/theme';
import {Divider, SectionLabel} from '../common';
import {SettingsRow} from './SettingsRow';

export type SettingsItem = {
  key: string;
  icon: IconName;
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type Props = {title: string; items: SettingsItem[]};

const useStyles = createUseStyles(({spacing}) => ({
  wrap: {gap: spacing.xs},
}));

export const SettingsList = ({title, items}: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      <SectionLabel>{title}</SectionLabel>
      {items.map((item, i) => (
        <View key={item.key}>
          <SettingsRow {...item} />
          {i < items.length - 1 ? <Divider /> : null}
        </View>
      ))}
    </View>
  );
};
