import React from 'react';
import {Pressable, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {IconName} from '@/assets/icons';
import {createUseStyles} from '@/theme';
import {AppText, Icon} from '../common';

const TAB_ICONS: Record<string, IconName> = {
  Home: 'home',
  PayStubs: 'pay-stubs',
  W2Forms: 'w2',
  Profile: 'profile',
};

const useStyles = createUseStyles(({colors, radius, spacing}) => ({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    gap: spacing.xs,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    gap: spacing.xxs,
  },
  active: {backgroundColor: colors.primarySoft},
}));

/** Custom bottom tab bar: selected tab gets a soft pill background. */
export const AppTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const styles = useStyles();
  const {bottom} = useSafeAreaInsets();

  return (
    <View style={[styles.bar, {paddingBottom: Math.max(bottom, 8)}]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const {options} = descriptors[route.key];
        const label = (options.tabBarLabel as string) ?? options.title ?? route.name;
        const color = focused ? 'onPrimarySoft' : 'textMuted';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityState={{selected: focused}}
            accessibilityLabel={label}
            onPress={onPress}
            style={[styles.item, focused && styles.active]}>
            <Icon name={TAB_ICONS[route.name] ?? 'home'} size={22} color={color} />
            <AppText variant="caption" color={color} style={{fontWeight: focused ? '700' : '500'}}>
              {label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
};
