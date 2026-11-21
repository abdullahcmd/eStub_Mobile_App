import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';
import {useAppDispatch} from '@/hooks/redux';
import {AppNavigation} from '@/navigation';
import {persistor, store} from '@/store';
import {bootstrapApp} from '@/store/slices/appSlice';
import {ThemeProvider, useTheme} from '@/theme';

const Bootstrap = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(bootstrapApp());
  }, [dispatch]);
  return <>{children}</>;
};

const ThemedStatusBar = () => {
  const {isDark} = useTheme();
  return <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />;
};

/**
 * Provider order matters:
 * Redux -> PersistGate (rehydrate theme/auth) -> Safe area -> Theme -> Navigation.
 */
const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ThemedStatusBar />
          <Bootstrap>
            <AppNavigation />
          </Bootstrap>
          <Toast />
        </ThemeProvider>
      </SafeAreaProvider>
    </PersistGate>
  </Provider>
);

export default App;
