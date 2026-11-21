import React, {useEffect} from 'react';
import {
  DocumentsSection,
  EncryptionNote,
  GreetingHeader,
  HomeHeader,
  LatestPayStubCard,
} from '@/components/home';
import {ScreenContainer} from '@/components/common';
import {ROUTES} from '@/constants/routes';
import {useAppDispatch, useAppSelector} from '@/hooks/redux';
import type {MainTabScreenProps} from '@/navigation/types';
import {selectAuth} from '@/store/slices/authSlice';
import {
  fetchPayStubs,
  selectLatestPayStub,
  selectPayStubsStatus,
} from '@/store/slices/payStubsSlice';
import {selectThemeMode, setThemeMode} from '@/store/slices/themeSlice';
import {useTheme} from '@/theme';

export const HomeScreen = ({navigation}: MainTabScreenProps<'Home'>) => {
  const dispatch = useAppDispatch();
  const {isDark} = useTheme();
  const {firstName} = useAppSelector(selectAuth);
  const latest = useAppSelector(selectLatestPayStub);
  const status = useAppSelector(selectPayStubsStatus);
  const themeMode = useAppSelector(selectThemeMode);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPayStubs({reset: true}));
    }
  }, [dispatch, status]);

  const toggleTheme = () => {
    // Flip whatever is currently being displayed; "System" is chosen in Profile.
    dispatch(setThemeMode(isDark || themeMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ScreenContainer scroll>
      <HomeHeader onToggleTheme={toggleTheme} />
      <GreetingHeader firstName={firstName || 'there'} />
      <LatestPayStubCard
        payStub={latest}
        loading={status === 'loading'}
        onViewPress={() =>
          latest && navigation.navigate(ROUTES.PayStubDetail, {payStubId: latest.id})
        }
      />
      <DocumentsSection
        onPayStubsPress={() => navigation.navigate(ROUTES.PayStubs)}
        onW2Press={() => navigation.navigate(ROUTES.W2Forms)}
      />
      <EncryptionNote />
    </ScreenContainer>
  );
};
