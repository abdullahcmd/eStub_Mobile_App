import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeMode} from '@/types';

type ThemeState = {mode: ThemeMode};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {mode: 'system'} as ThemeState,
  reducers: {
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
  },
});

export const {setThemeMode} = themeSlice.actions;
export default themeSlice.reducer;

export const selectThemeMode = (state: {theme: ThemeState}) => state.theme.mode;
