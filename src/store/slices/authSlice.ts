import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authService, FindCompanyPayload} from '@/api/services';
import {setAuthToken} from '@/api/client';
import {config} from '@/constants/config';
import {Company, RequestStatus} from '@/types';
import {biometrics} from '@/utils/biometrics';
import {getErrorMessage} from '@/utils/errors';
import {secureStorage} from '@/utils/secureStorage';

/**
 * Sign-in is a 4-step wizard (company -> employee ID -> PIN -> password).
 * Wizard answers live here so later steps/screens can read them.
 * Persisted keys are whitelisted in store/index.ts — `token` is NEVER persisted
 * (it lives in the keychain, see utils/secureStorage).
 */
export type AuthState = {
  company: Company | null;
  firstName: string;
  lastName: string;
  employeeId: string;
  token: string | null;
  biometricEnabled: boolean;
  /** epoch ms at which the current PIN expires */
  pinExpiresAt: number | null;
  status: RequestStatus;
  error: string | null;
};

const initialState: AuthState = {
  company: null,
  firstName: '',
  lastName: '',
  employeeId: '',
  token: null,
  biometricEnabled: false,
  pinExpiresAt: null,
  status: 'idle',
  error: null,
};

type ThunkConfig = {rejectValue: string; state: {auth: AuthState}};
const createThunk = createAsyncThunk.withTypes<ThunkConfig>();

export const submitCompany = createThunk(
  'auth/submitCompany',
  async (payload: FindCompanyPayload, {rejectWithValue}) => {
    try {
      const company = await authService.findCompany(payload);
      return {company, firstName: payload.firstName, lastName: payload.lastName};
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
);

export const submitEmployeeId = createThunk(
  'auth/submitEmployeeId',
  async (employeeId: string, {getState, rejectWithValue}) => {
    try {
      const {company} = getState().auth;
      await authService.verifyEmployeeId({
        companyId: company?.id ?? '',
        employeeId,
      });
      await authService.requestPin();
      return employeeId;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
);

export const resendPin = createThunk(
  'auth/resendPin',
  async (_: void, {rejectWithValue}) => {
    try {
      await authService.requestPin();
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
);

export const submitPin = createThunk(
  'auth/submitPin',
  async (pin: string, {rejectWithValue}) => {
    try {
      await authService.verifyPin(pin);
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
);

export const submitPassword = createThunk(
  'auth/submitPassword',
  async (password: string, {getState, rejectWithValue}) => {
    try {
      const {employeeId, firstName, lastName} = getState().auth;
      const {token} = await authService.login({
        employeeId,
        firstName,
        lastName,
        password,
      });
      await secureStorage.saveToken(token);
      setAuthToken(token);
      return token;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
);

/** Face ID / fingerprint login — reuses the token stored in the keychain. */
export const loginWithBiometrics = createThunk(
  'auth/loginWithBiometrics',
  async (_: void, {rejectWithValue}) => {
    try {
      const ok = await biometrics.authenticate();
      if (!ok) {
        return rejectWithValue('Biometric authentication was cancelled.');
      }
      const token = await secureStorage.getToken();
      if (!token) {
        return rejectWithValue('Sign in with your password first.');
      }
      setAuthToken(token);
      return token;
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
);

/** Called once on app start: restores a previously stored session. */
export const restoreSession = createThunk('auth/restoreSession', async () => {
  const token = await secureStorage.getToken();
  setAuthToken(token);
  return token;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await secureStorage.clearToken();
  setAuthToken(null);
});

const pendingReducer = (state: AuthState) => {
  state.status = 'loading';
  state.error = null;
};
const failedReducer = (
  state: AuthState,
  action: {payload?: string},
) => {
  state.status = 'failed';
  state.error = action.payload ?? 'Something went wrong.';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
      if (state.status === 'failed') {
        state.status = 'idle';
      }
    },
    setBiometricEnabled(state, action: PayloadAction<boolean>) {
      state.biometricEnabled = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitCompany.pending, pendingReducer)
      .addCase(submitCompany.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.company = payload.company;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
      })
      .addCase(submitCompany.rejected, failedReducer)

      .addCase(submitEmployeeId.pending, pendingReducer)
      .addCase(submitEmployeeId.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.employeeId = payload;
        state.pinExpiresAt = Date.now() + config.PIN_EXPIRY_SECONDS * 1000;
      })
      .addCase(submitEmployeeId.rejected, failedReducer)

      .addCase(resendPin.pending, pendingReducer)
      .addCase(resendPin.fulfilled, state => {
        state.status = 'succeeded';
        state.pinExpiresAt = Date.now() + config.PIN_EXPIRY_SECONDS * 1000;
      })
      .addCase(resendPin.rejected, failedReducer)

      .addCase(submitPin.pending, pendingReducer)
      .addCase(submitPin.fulfilled, state => {
        state.status = 'succeeded';
        state.pinExpiresAt = null;
      })
      .addCase(submitPin.rejected, failedReducer)

      .addCase(submitPassword.pending, pendingReducer)
      .addCase(submitPassword.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.token = payload;
        state.biometricEnabled = true;
      })
      .addCase(submitPassword.rejected, failedReducer)

      .addCase(loginWithBiometrics.pending, pendingReducer)
      .addCase(loginWithBiometrics.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.token = payload;
      })
      .addCase(loginWithBiometrics.rejected, failedReducer)

      .addCase(restoreSession.fulfilled, (state, {payload}) => {
        state.token = payload;
      })

      .addCase(logout.fulfilled, state => {
        // Keep company/name so the user can sign back in quickly,
        // but force the full verification flow again.
        state.token = null;
        state.pinExpiresAt = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export const {clearAuthError, setBiometricEnabled} = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (state: {auth: AuthState}) => state.auth;
export const selectIsAuthenticated = (state: {auth: AuthState}) =>
  !!state.auth.token;
export const selectAuthLoading = (state: {auth: AuthState}) =>
  state.auth.status === 'loading';
export const selectAuthError = (state: {auth: AuthState}) => state.auth.error;
