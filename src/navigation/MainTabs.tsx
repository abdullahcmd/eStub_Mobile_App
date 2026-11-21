import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AppTabBar} from '@/components/navigation';
import {ROUTES} from '@/constants/routes';
import {
  HomeScreen,
  PayStubsScreen,
  ProfileScreen,
  W2FormsScreen,
} from '@/screens';
import type {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => (
  <Tab.Navigator
    initialRouteName={ROUTES.Home}
    tabBar={props => <AppTabBar {...props} />}
    screenOptions={{headerShown: false}}>
    <Tab.Screen name={ROUTES.Home} component={HomeScreen} options={{tabBarLabel: 'Home'}} />
    <Tab.Screen name={ROUTES.PayStubs} component={PayStubsScreen} options={{tabBarLabel: 'Pay Stubs'}} />
    <Tab.Screen name={ROUTES.W2Forms} component={W2FormsScreen} options={{tabBarLabel: 'W-2'}} />
    <Tab.Screen name={ROUTES.Profile} component={ProfileScreen} options={{tabBarLabel: 'Profile'}} />
  </Tab.Navigator>
);
