import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {AppLogo} from '../src/components/auth/AppLogo';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import themeReducer from '../src/store/slices/themeSlice';
import {ThemeProvider} from '../src/theme';

test('AppLogo renders inside the theme provider', async () => {
  const store = configureStore({reducer: {theme: themeReducer}});
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(
      <Provider store={store}>
        <ThemeProvider>
          <AppLogo />
        </ThemeProvider>
      </Provider>,
    );
  });
});
