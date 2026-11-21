import {createNavigationContainerRef} from '@react-navigation/native';
import type {RootStackParamList} from './types';

/** Use for navigation outside React components (e.g. from thunks/interceptors). */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
