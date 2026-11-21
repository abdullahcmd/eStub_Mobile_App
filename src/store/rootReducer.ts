import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import payStubsReducer from './slices/payStubsSlice';
import themeReducer from './slices/themeSlice';
import w2Reducer from './slices/w2Slice';

/** Only non-sensitive wizard answers are persisted. Tokens go to the keychain. */
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['company', 'firstName', 'lastName', 'employeeId', 'biometricEnabled'],
};

const themePersistConfig = {
  key: 'theme',
  storage: AsyncStorage,
};

export const rootReducer = combineReducers({
  app: appReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
  payStubs: payStubsReducer,
  w2: w2Reducer,
});
