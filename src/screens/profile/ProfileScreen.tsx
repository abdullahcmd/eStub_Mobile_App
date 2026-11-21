import React from 'react';
import {Linking, View} from 'react-native';
import {ScreenContainer, ScreenHeader} from '@/components/common';
import {
  AppearanceSelector,
  AppVersionFooter,
  ProfileCard,
  SettingsItem,
  SettingsList,
} from '@/components/profile';
import {config} from '@/constants/config';
import {ROUTES} from '@/constants/routes';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import type {MainTabScreenProps} from '@/navigation/types';
import {selectAuth} from '@/store/slices/authSlice';
import {selectThemeMode, setThemeMode} from '@/store/slices/themeSlice';
import {createUseStyles} from '@/theme';

const useStyles = createUseStyles(({spacing}) => ({
  stack: {gap: spacing.xl},
}));

export const ProfileScreen = ({navigation}: MainTabScreenProps<'Profile'>) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {firstName, lastName, employeeId} = useAppSelector(selectAuth);
  const mode = useAppSelector(selectThemeMode);

  // TODO: notification preferences & privacy screens are not designed yet.
  const items: SettingsItem[] = [
    {key: 'notifications', icon: 'bell', label: 'Notification preferences', onPress: () => {}},
    {
      key: 'help',
      icon: 'help',
      label: 'Help & Support',
      onPress: () => Linking.openURL(`mailto:${config.SUPPORT_EMAIL}`),
    },
    {key: 'privacy', icon: 'shield', label: 'Privacy & security', onPress: () => {}},
    {
      key: 'logout',
      icon: 'logout',
      label: 'Log out',
      destructive: true,
      onPress: () => navigation.navigate(ROUTES.LogoutSheet),
    },
  ];

  return (
    <ScreenContainer scroll>
      <ScreenHeader title="Profile" />
      <View style={styles.stack}>
        <ProfileCard firstName={firstName} lastName={lastName} employeeId={employeeId} />
        <AppearanceSelector mode={mode} onChange={m => dispatch(setThemeMode(m))} />
        <SettingsList title="Preferences & support" items={items} />
        <AppVersionFooter />
      </View>
    </ScreenContainer>
  );
};
