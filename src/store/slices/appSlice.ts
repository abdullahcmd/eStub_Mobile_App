import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {config} from '@/constants/config';
import {restoreSession} from './authSlice';

type AppState = {isBootstrapped: boolean};

/** Runs on launch: restores the session and enforces a minimum splash time. */
export const bootstrapApp = createAsyncThunk(
  'app/bootstrap',
  async (_: void, {dispatch}) => {
    await Promise.all([
      dispatch(restoreSession()),
      new Promise(resolve => setTimeout(resolve, config.SPLASH_MIN_DURATION_MS)),
    ]);
  },
);

const appSlice = createSlice({
  name: 'app',
  initialState: {isBootstrapped: false} as AppState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(bootstrapApp.fulfilled, state => {
      state.isBootstrapped = true;
    });
    builder.addCase(bootstrapApp.rejected, state => {
      state.isBootstrapped = true;
    });
  },
});

export default appSlice.reducer;

export const selectIsBootstrapped = (state: {app: AppState}) =>
  state.app.isBootstrapped;
